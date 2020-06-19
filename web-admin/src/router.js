import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import { I18nextProvider } from 'react-i18next'
import { AppConst, RoleConst } from './configs'
import { i18n } from './configs/locale'


// Load views
import { LayoutView } from './screens/layout'
import { LoginView, LoginModel } from './screens/login'
import { NotFoundView } from './screens/error/404'
import { UserModel, UserView } from './screens/user/list'
import { UserShowView, UserShowModel, CandidateModel } from './screens/user/show'
import { CareerGroupModel, CareerGroupView } from './screens/career-group/list'
import { RecuitermentsView, RecuitermentsModel } from './screens/recuiterment'
import { CVsModel, CVsView } from './screens/cv'
import { DetailCVView } from './screens/cv/detail'
import { DetailRecuitementView } from './screens/recuiterment/detail'
import { StatisticChartView, StatisticChartModel } from './screens/statistic-chart'
import { BuisnessesListView, BuisnessesModel } from './screens/business/list';
import { BusinessesDetailView, BusinessesDetailModel } from './screens/business/detail';

const { ConnectedRouter } = routerRedux

function Routers({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./screens/error'),
  })
  const unauthenticatedRoutes = [{
    path: '/login',
    models: () => [LoginModel],
    component: () => LoginView,
  }]
  // Routes
  const routes = [{
    path: '/404',
    component: () => NotFoundView,
  }, {
    path: '/users',
    models: () => [UserModel],
    component: () => UserView,
  }, {
    path: '/users/:id',
    models: () => [UserShowModel, CandidateModel],
    component: () => UserShowView,
  }, {
    path: '/career-groups',
    models: () => [CareerGroupModel],
    component: () => CareerGroupView,
  }, {
    path: '/recuiterments',
    models: () => [RecuitermentsModel],
    component: () => RecuitermentsView,
  }, {
    path: '/cvs',
    models: () => [CVsModel],
    component: () => CVsView,
  }, {
    path: '/cvs/:id',
    models: () => [CVsModel],
    component: () => DetailCVView,
  }, {
    path: '/recuiterments/:id',
    models: () => [RecuitermentsModel],
    component: () => DetailRecuitementView,
  }, {
    path: '/statistic',
    models: () => [StatisticChartModel],
    component: () => StatisticChartView,
  }, {
    path: '/businesses',
    models: () => [BuisnessesModel],
    component: () => BuisnessesListView,
  }, {
    path: '/businesses/:id',
    models: () => [BusinessesDetailModel],
    component: () => BusinessesDetailView,
  }]

  const role = localStorage.getItem(AppConst.localStorage.roleKey)
  const unauthenticatedComponents = (
    <Switch>
      <Route exact path="/" render={() => (<Redirect to="/login" />)} />
      {
        unauthenticatedRoutes.map(({ path, ...dynamics }) => (
          <Route
            key={path}
            exact
            path={path}
            component={dynamic({
              app,
              ...dynamics,
            })}
          />
        ))
      }
    </Switch>
  )
  return (
    <I18nextProvider i18n={i18n}>
      <ConnectedRouter history={history}>
        <LayoutView unauthenticatedComponents={unauthenticatedComponents}>
          <Switch>
            <Route exact path="/" render={() => (<Redirect to={`/${RoleConst[role || 'admin'].pages[0].id}`} />)} />
            {
              routes.map(({ path, ...dynamics }) => (
                <Route
                  key={path}
                  exact
                  path={path}
                  component={dynamic({
                    app,
                    ...dynamics,
                  })}
                />
              ))
            }
            <Route component={error} />
          </Switch>
        </LayoutView>
      </ConnectedRouter>
    </I18nextProvider>
  )
}

Routers.propTypes = {
  history: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
}
export default Routers
