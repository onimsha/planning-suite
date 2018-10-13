import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import {
  Button,
  Field,
  Text,
  TextInput,
  DropDown,
  theme,
  Info,
} from '@aragon/ui'

import {
  DescriptionInput,
  Form,
  FormField,
  OptionsInput,
  SettingsInput,
} from '../Form'
import { isIntegerString, isStringEmpty } from '../../utils/helpers'

// TODO: Extract to shared
const AVAILABLE_TOKENS = ['ETH', 'ANT', 'GIV', 'FTL', '🦄']
const ALLOCATION_TYPES = ['Informational', 'Token Transfer']
const INITIAL_STATE = {
  description: '',
  votingTokens: null,
  options: [],
  optionsInput: '',
  allocationType: '',
  allocationTypeIndex: 0,
  activePayoutOption: 0,
  payoutTypes: ['One-Time', 'Monthly'],
  amount: null,
}

class NewAllocation extends React.Component {
  static propTypes = {
    key: PropTypes.number.isRequired,
    onSubmitAllocation: PropTypes.func.isRequired,
    description: PropTypes.string,
  }

  state = INITIAL_STATE

  // TODO: improve field checking for input errors and sanitize
  changeField = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  // TODO: Manage dropdown to return a name and value as the rest of inputs
  changeAllocationType = (index, items) => {
    this.setState({ allocationTypeIndex: index, allocationType: items[index] })
  }

  submitAllocation = () => {
    // clear input here.
    let informational = this.state.allocationTypeIndex == 0
    // TO-DO :: Recurring needs to be set!!!
    let allocation = {
      addresses: this.state.options,
      payoutId: this.props.id,
      information: informational,
      recurring: false,
      period: 3600,
      balance: this.props.limit
    }
    this.props.onSubmitAllocation(allocation)
    this.setState(INITIAL_STATE)
    console.info('New Allocation: submitting...')
    console.table(this.props)
    console.table(this.state)
  }

  render() {
    return (
      <Form
        // heading={this.props.heading}
        subHeading={this.props.subHeading}
        onSubmit={this.submitAllocation}
        description={this.props.description}
        submitText="Submit Allocation"
      >
        <FormField
          required
          label="Description"
          input={
            <DescriptionInput
              name="description"
              onChange={this.changeField}
              placeholder="Describe your allocation."
              value={this.state.description}
            />
          }
        />
        <FormField
          required
          separator
          label="Allocation type"
          input={
            <DropDown
              active={this.state.allocationTypeIndex}
              items={ALLOCATION_TYPES}
              name="allocationType"
              onChange={this.changeAllocationType}
            />
          }
        />
        <FormField
          separator
          label="Options"
          input={
            <OptionsInput
              name="options"
              placeholder="Enter an option"
              onChange={this.changeField}
              value={this.state.options}
              input={this.state.optionsInput}
            />
          }
        />
        <FormField
          label="Settings"
          input={
            <SettingsInput
              name="options"
              placeholder="Enter an option"
              onChange={this.changeField}
              value={this.state.settings}
            />
          }
        />
      </Form>
    )
  }
}

export default NewAllocation

// TODO: Add Warning message, amount input and date picker input
// FormFields: Warning* , descrription, alloocation type, amount, options
// if allocation type token... show warning y amount
// if freq > one time, show date picker