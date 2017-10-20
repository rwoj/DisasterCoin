import React, {Component} from 'react';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import axios from 'axios';
import {Button,Row, Col, Table} from 'react-bootstrap';
import { fetchCampaigns } from '../actions/campaignActions'
// import styled from 'styled-components'
import { Connect } from 'uport-connect'

class CampaignLanding extends Component {

  constructor (props) {
    super(props)

    this.state = {
      campaigns: []
    }
  }

    componentDidMount () {
      this.props.fetchCampaigns()
    }
    render () {
        let campaigns = this.props.campaigns.map((campaign, index) => {
            return (
                <tr key={index}>
                    <td><h3 onClick={() => this.props.navigateToCampaign(campaign.id)}>{campaign.name}</h3></td>
                    <td>{campaign.limit} </td>
                    <td>{campaign.deadline} </td>
                </tr>
            )
        })
        return (
            <div>
                <Row>
                    <Col xsOffset={1} xs={11}>
                        <h4>Available Campaigns</h4>
                    </Col>
                    <Col xsOffset={1} xs={11}>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Limit</th>
                                    <th>Deadline</th>
                                </tr>
                            </thead>
                            <tbody>
                                {campaigns}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

            </div>
        );
    }

}

const mapStatetoProps = (state) => {
  return {
    campaigns: state.campaigns.campaigns
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCampaigns: () => dispatch(fetchCampaigns()),
    navigateToCampaign: (id) => dispatch(push(`/campaign/${id}`))
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(CampaignLanding)