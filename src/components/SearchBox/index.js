/* global google window */
import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { withScriptjs } from 'react-google-maps';
import { compose, lifecycle, withProps, branch, renderNothing } from 'recompose';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import { InputField, Label, ErrorText, WarningText } from '../';

const Wrapper = styled.div`
  display: flex;
	flex-direction: column;
	flex-wrap: wrap;
  align-items: flex-start;

  flex: 1;
  margin-top: 1rem;
  position: relative;
`;

const PlacesWithStandaloneSearchBox = compose(
  branch(
    () => !window.google,
    renderNothing,
  ),
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD6U3EySAnVr7UPa_I5KDaINIxzDdSaJg0&v=3.exp&libraries=places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};
      this.setState({
        places: [],
        onSearchBoxMounted: (ref) => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          this.props.change('dreamDestination', get(places, '0.formatted_address'));
          this.props.change('geometry', get(places, '0.geometry'));
          this.setState({
            places,
          });
        },
      });
    },
  }),
  withScriptjs,
)(({
  onSearchBoxMounted, bounds, onPlacesChanged, places, input, meta, label, ...props
}) => console.log(props) || (
  <Wrapper>
    <Label error={meta.touched && meta.error} label={label}>
      {label}
      {meta.touched &&
        ((meta.error && <ErrorText>{meta.error}</ErrorText>) ||
          (meta.warning && <WarningText>{meta.warning}</WarningText>))}
    </Label>
    <StandaloneSearchBox
      ref={onSearchBoxMounted}
      bounds={bounds}
      onPlacesChanged={() =>
              // change('dreamDestination', );
               onPlacesChanged()
            }
    >
      <InputField
        {...input}
        type="text"
        placeholder="Amsterdam"
      />
    </StandaloneSearchBox>
  </Wrapper>
  ));
export default PlacesWithStandaloneSearchBox;
