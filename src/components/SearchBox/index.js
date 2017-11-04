/* global google */
import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { compose, lifecycle, withProps, withState, withHandlers } from "recompose";
import { Field } from 'redux-form';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import { InputField, For, Label } from '../';

const Wrapper = styled.div`
  align-self: flex-end;
  margin-left: 1rem;
`;

const StyledStandaloneSearchBox = styled(StandaloneSearchBox)`
`;

const PlacesWithStandaloneSearchBox = compose(
  withProps({    
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD6U3EySAnVr7UPa_I5KDaINIxzDdSaJg0&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
  }),
  lifecycle({
      componentWillMount() {
        const refs = {}
        console.log(this);
        this.setState({
          places: [],
          onSearchBoxMounted: ref => {
            refs.searchBox = ref;
          },
          onPlacesChanged: (data) => {
            console.log(data);
            const places = refs.searchBox.getPlaces();
            this.props.change('dreamDestination', get(places, '0.formatted_address'));
            this.props.change('geometry', get(places, '0.geometry'));
            this.setState({
              places,
            });
          },
        })
      },
    }),
    withScriptjs  
)(({ onSearchBoxMounted, bounds, onPlacesChanged, input, places, change }) => {
      console.log(input, places);
      return(
        <StandaloneSearchBox
          ref={onSearchBoxMounted}
          bounds={bounds}
          onPlacesChanged={() => {
            // change('dreamDestination', );
            return onPlacesChanged()
          }}
        >
          <input
            {...input}
            type="text"
            name="test"
            placeholder="Where is your dream destination?"
            style={{
              border: `1px solid transparent`,
              flex: `1`,
              padding: '1.1rem',
              alignSelf: 'flex-end',
              outline: `none`,
              textOverflow: `ellipses`,
            }}
          />
        </StandaloneSearchBox>
      );
});
export default PlacesWithStandaloneSearchBox;
