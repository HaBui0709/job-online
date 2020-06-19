/* eslint-disable no-undef */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import get from 'lodash/get'
import { compose, withProps, lifecycle } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox'
import { AppConst, ApiConst } from '../configs'
import helper from '../utils/helper'

const zodyLocation = AppConst.googleMaps.defaultCenter
const { defaultZoom } = AppConst.googleMaps

const getAddressFromAddessComponents = (address) => {
  const result = address.reduce((accumulator, currentValue, index) => {
    return index !== address.length - 1 ? `${accumulator + currentValue.long_name}, ` : `${accumulator + currentValue.long_name}`
  }, '')
  return result
}

/**
 * Format address components
 *
 * @param {Array} addressComponents
 */
const formatAddressComponents = (addressComponents) => {
  if (!addressComponents || !addressComponents.length) {
    return []
  }
  const data = addressComponents.reverse().map(item => ({ name: item.long_name, id: helper.getSlug(item.long_name) }))
  return [{
    country: data[0],
    city: data[1],
    district: data[2],
  }]
}

export default compose(
  withProps({
    googleMapURL: ApiConst.googleMaps,
    loadingElement: <div style={{ height: '100%' }} />,
    // containerElement: <div className="hello" style={{ height: '200px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}
      this.setState({
        bounds: null,
        center: zodyLocation,
        onMapMounted: (ref) => {
          refs.map = ref
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: (ref) => {
          refs.searchBox = ref
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces()
          const bounds = new google.maps.LatLngBounds()
          const addressComponents = get(places, '0.address_components')
          const address = getAddressFromAddessComponents(addressComponents)

          const latlng = get(places, '0.geometry.location')

          const location = {
            coordinates: [latlng.lng(), latlng.lat()],
          }

          this.props.updateData({
            addressComponents: formatAddressComponents(addressComponents),
            address,
            location,
            mapAddress: address,
          })
          places.forEach((place) => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          })
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }))
          const nextCenter = get(nextMarkers, '0.position', this.state.center)

          this.setState({
            center: nextCenter,
          })
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap,
)(({ showSearchBox = true, onMapMounted, center, onSearchBoxMounted, bounds, onPlacesChanged, address, coordinates }) => {
  const position = coordinates && coordinates.length ? { lat: coordinates[1], lng: coordinates[0] } : null
  return (
    <GoogleMap
      ref={onMapMounted}
      defaultZoom={defaultZoom}
      center={position || center}
    >
      {
        showSearchBox && (
          <SearchBox
            ref={onSearchBoxMounted}
            bounds={bounds}
            controlPosition={google.maps.ControlPosition.TOP_LEFT}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="maps-search"
              defaultValue={address}
            />
          </SearchBox>
        )
      }
      {
        coordinates && <Marker position={position} />
      }
    </GoogleMap>
  )
})
