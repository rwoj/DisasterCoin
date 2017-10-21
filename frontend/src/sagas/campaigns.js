import { all, put, takeEvery } from 'redux-saga/effects'
import { storeCampaigns, storeCampaign } from '../actions/campaignActions'
import { FETCH_CAMPAIGNS, FETCH_CAMPAIGN, CREATE_CAMPAIGN } from '../constants/CampaignActionTypes'
import { push } from 'react-router-redux'
import * as contracts from '../contracts'

function* fetchCampaigns () {
  let config = {
    method: 'GET',
    headers: new Headers(),
    mode: 'cors',
    cache: 'default'
  }
  let campaigns = []
  // '/campaigns'
  yield fetch('http://0.0.0.0:8080/campaigns', config)
    .then((response) => response.json())
    .then((campaignsArr) => {
        console.log('yayyyy')
      campaigns = campaignsArr
    })
    .catch(err => {
      console.log(err)
    })

  yield put(storeCampaigns(campaigns))
}


function* fetchCampaign (address) {
  let config = {
    method: 'GET',
    headers: new Headers(),
    mode: 'cors',
    cache: 'default'
  }
  let campaign = []

  yield fetch('http://0.0.0.0:8080/campaign/${address}', config)
    .then((response) => response.json())
    .then((campaignArr) => {
      campaign = campaignArr
    })
    .catch(err => {
      console.log(err)
    })

  yield put(storeCampaign(campaign))
}

function* createCampaign (campaign) {
  let campaignHub, accounts, tx
  yield campaignHub = contracts.CampaignHub.deployed()
  yield accounts = window.web3.eth.getAccountsPromise()
  yield tx = campaignHub.addCampaign(campaign.ipfsHash, campaign.goalAmount, campaign.weiLimitPerBlock, campaign.deadline, {from: accounts[0], gas: 2e6})
  console.log('tx ~>', tx)
  yield put(push(`/campaign/${tx.logs[0].args.campaign}`))
}

function* campaignSaga () {
  yield all([
    takeEvery(FETCH_CAMPAIGNS, fetchCampaigns),
    takeEvery(FETCH_CAMPAIGN, fetchCampaign),
    takeEvery(CREATE_CAMPAIGN, createCampaign)
  ])
}

export default campaignSaga
