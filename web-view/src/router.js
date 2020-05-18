import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import { I18nextProvider } from 'react-i18next'
import { AppConst, RoleConst } from './configs'
import { i18n } from './configs/locale'


// Load views
import { LayoutView } from './screens/layout'
import { NotFoundView } from './screens/error/404'
import { LoginChooseView, LoginCandidateView, LoginModel, LoginRecuiterView } from './screens/login'
import { HomeCandidateView, HomeCandidateModel } from './screens/home/candidate'
import { HomePageRecuiterView } from './screens/home/recuiter'
import { CandidateView } from './screens/candidate'
import { RegisterModel, RegisterChooseView, CandidateRegisterView } from './screens/register'

import { CVFormCreateView, CandidateCVModel } from './screens/candidate/cv/create'
import { ListCVView, CVModel } from './screens/candidate/cv/list'
import { PreviewCVView } from './screens/candidate/cv/detail'

import { RecuitermentDetailModel, RecuitermentDetailView } from './screens/recuiterment/detail'
import { BusinessModel, BusinessView } from './screens/business'
import { RegisterRecuiterForm } from './screens/register/form-register/recuiter'
import { CreateRecuitermentView, CreateRecuitermentModel } from './screens/recuiterment/create'
import { RecuitermentsListView, RecuitermentsModel } from './screens/recuiterment/list'
import { AccountModel, AccountFormView } from './screens/account'
import { BusinessFormView, BusinessUpdateModel } from './screens/business/update';
import { ResultSearchJobView, SearchJobModel } from './screens/search-job';
import { ListRecuitermentApprovedView, RecuitermentsApprovedModel } from './screens/apply-job/recuiter/list'
import { ApplyJobView, ApplyJobModel } from './screens/apply-job/recuiter/detail'
import { CandidateListApplyJobsView, CandidateListApplyJobsModel } from './screens/apply-job/candidate/list';
import { NotificationModel, NotificationView } from './screens/notification-job';
import { FavoriteHistoryModel, FavoriteHistoryView } from './screens/favorite-histories/list';
import { CVBeautyModel, CVBeautyView } from './screens/candidate/beauty-cv';

const { ConnectedRouter } = routerRedux

function Routers({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./screens/error'),
  })
  const unauthenticatedRoutes = [{
    path: '/404',
    component: () => NotFoundView,
  }, {
    path: '/login/chooses',
    component: () => LoginChooseView,
  }, {
    path: '/login/candidate',
    models: () => [LoginModel],
    component: () => LoginCandidateView,
  }, {
    path: '/login/recuiter',
    models: () => [LoginModel],
    component: () => LoginRecuiterView,
  }, {
    path: '/register/candidate',
    models: () => [RegisterModel],
    component: () => CandidateRegisterView,
  }, {
    path: '/home',
    models: () => [HomeCandidateModel, SearchJobModel],
    component: () => HomeCandidateView,
  }, {
    path: '/home/recuiter',
    component: () => HomePageRecuiterView,
  }, {
    path: '/candidate',
    component: () => CandidateView,
  }, {
    path: '/register/chooses',
    models: () => [RegisterModel],
    component: () => RegisterChooseView,
  }, {
    path: '/register/recuiter',
    models: () => [RegisterModel],
    component: () => RegisterRecuiterForm,
  }, {
    path: '/recuiterments/:id',
    models: () => [RecuitermentDetailModel],
    component: () => RecuitermentDetailView,
  }, {
    path: '/company/:id',
    models: () => [BusinessModel],
    component: () => BusinessView,
  }, {
    path: '/viec-lam/tim-kiem',
    models: () => [SearchJobModel],
    component: () => ResultSearchJobView,
  }]
  // Routes
  const routes = [{
    path: '/404',
    component: () => NotFoundView,
  }, {
    path: '/home',
    models: () => [HomeCandidateModel, SearchJobModel],
    component: () => HomeCandidateView,
  }, {
    path: '/candidate/create-cv',
    models: () => [CandidateCVModel, SearchJobModel],
    component: () => CVFormCreateView,
  }, {
    path: '/candidate/cv',
    models: () => [CVModel, SearchJobModel],
    component: () => ListCVView,
  }, {
    path: '/candidate/cv/preivew/:id',
    models: () => [CVModel, SearchJobModel],
    component: () => PreviewCVView,
  }, {
    path: '/recuiterments/:id',
    models: () => [RecuitermentDetailModel, SearchJobModel],
    component: () => RecuitermentDetailView,
  }, {
    path: '/home/recuiter',
    component: () => HomePageRecuiterView,
  }, {
    path: '/company/:id',
    models: () => [BusinessModel, SearchJobModel],
    component: () => BusinessView,
  }, {
    path: '/recuiter/recuiterment/create',
    models: () => [CreateRecuitermentModel, SearchJobModel],
    component: () => CreateRecuitermentView,
  }, {
    path: '/recuiter/recuiterments',
    models: () => [RecuitermentsModel, SearchJobModel],
    component: () => RecuitermentsListView,
  }, {
    path: '/accounts/:id',
    models: () => [AccountModel, SearchJobModel],
    component: () => AccountFormView,
  }, {
    path: '/business/update/:id',
    models: () => [BusinessUpdateModel, SearchJobModel],
    component: () => BusinessFormView,
  }, {
    path: '/viec-lam/tim-kiem',
    models: () => [SearchJobModel],
    component: () => ResultSearchJobView,
  }, {
    path: '/recuiter/apply-jobs',
    models: () => [RecuitermentsApprovedModel, SearchJobModel],
    component: () => ListRecuitermentApprovedView,
  }, {
    path: '/recuiter/apply-jobs/:id',
    models: () => [ApplyJobModel, SearchJobModel],
    component: () => ApplyJobView,
  }, {
    path: '/candidate/apply-jobs',
    models: () => [CandidateListApplyJobsModel, SearchJobModel],
    component: () => CandidateListApplyJobsView,
  }, {
    path: '/thiet-lap-thong-bao-viec-lam',
    models: () => [NotificationModel, SearchJobModel],
    component: () => NotificationView,
  }, {
    path: '/cong-viec-yeu-thich',
    models: () => [FavoriteHistoryModel, SearchJobModel],
    component: () => FavoriteHistoryView,
  }, {
    path: '/candidate/cv-beauty',
    models: () => [CVBeautyModel, SearchJobModel],
    component: () => CVBeautyView,
  }]

  const role = localStorage.getItem(AppConst.localStorage.roleKey)
  const unauthenticatedComponents = (
    <Switch>
      <Route exact path="/" render={() => (<Redirect to="/home" />)} />
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
      <Route component={error} />
    </Switch>
  )
  return (
    <I18nextProvider i18n={i18n}>
      <ConnectedRouter history={history}>
        <LayoutView unauthenticatedComponents={unauthenticatedComponents}>
          <Switch>
            <Route exact path="/" render={() => (<Redirect to={`/${RoleConst[role].pages[0].id}`} />)} />
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
