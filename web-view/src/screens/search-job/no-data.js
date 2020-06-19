import React from 'react'
// import { Link } from 'react-router-dom';

class NoDataSearchView extends React.Component {
  render() {
    return (
      <div style={{ fontSize: '14px', fontWeight: 500 }} className="box-white-content box-noti-red">
        <p style={{ fontWeight: 700 }} className="text-center">
          Hiện chưa tìm thấy việc làm phù hợp với tiêu chí này.
        </p>
        <p style={{ fontWeight: 400, color: '#363636' }}>
          Gợi ý tìm kiếm:
        </p>
        <ul style={{ paddingLeft: '15px', fontWeight: 400, lineHeight: 1.8, color: '#363636', listStyle: 'disc' }}>
          <li> Sử dụng từ khóa khác đồng nghĩa </li>
          <li> Mở rộng tiêu chí tìm kiếm </li>
          {/* <li> Xem thêm
            <Link
              to="fff"
              style={{ color: '#22924c', fontWeight: 'bold' }}
            >
            Việc làm phù hợp
            </Link>
          </li>
          <li> Xem thêm
            <Link
              to="dff"
              style={{ color: '#22924c', fontWeight: 'bold' }}
            >
              Việc làm theo ngành nghề
            </Link>
          </li> */}
        </ul>
      </div>
    )
  }
}

export default NoDataSearchView
