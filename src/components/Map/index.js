/* global google */
import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import SearchBox from 'react-google-maps/lib/components/places/SearchBox';
import { compose, lifecycle, withProps, branch, renderNothing } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Aubergine from './style.json';


const Wrapper = styled.div`
	background-color: #414;
	height: 50%;
`;

const placeGeometry = gql`
{
  allPersons {
    id
    geometry
  }
}
`;

const Map = compose(
  graphql(placeGeometry),
  branch(
    () => !window.google,
    renderNothing,
  ),
  withProps(props => ({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD6U3EySAnVr7UPa_I5KDaINIxzDdSaJg0&v=3.exp&libraries=geometry',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
    pins: (props.data.allPersons || []).map(person => person.geometry),
  })),
  lifecycle({
    componentWillMount() {
      const refs = {};
      const pins = this.props.pins;
      this.setState({
        bounds: null,
        center: {
          lat: 41.9, lng: -87.624,
        },
        markers: [...pins],
        onMapMounted: (ref) => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          });
        },
        onSearchBoxMounted: (ref) => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach((place) => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          // refs.map.fitBounds(bounds);
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap,
)(({
 markers, onMapMounted, center, form, onBoundsChanged, onSearchBoxMounted, bounds, onPlacesChanged,
}) =>
  (<Wrapper>
    <GoogleMap
      ref={onMapMounted}
      defaultZoom={4}
      center={center || get(form.contact, '')}
      onBoundsChanged={onBoundsChanged}
      defaultOptions={{ styles: Aubergine }}
    >
      <SearchBox
        ref={onSearchBoxMounted}
        bounds={bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Where is your dream destination?"
          style={{
						boxSizing: 'border-box',
						border: '1px solid transparent',
						width: '300px',
						height: '32px',
						marginTop: '10px',
						padding: '1rem',
						borderRadius: '3px',
						boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
						fontSize: '1rem',
						outline: 'none',
						textOverflow: 'ellipses',
					}}
        />
      </SearchBox>
      {markers.map((marker, index) =>
        <Marker key={index} position={marker.position} />)}
    </GoogleMap>
  </Wrapper>));


Map.propTypes = {};
Map.defaultProps = {};

export default Map;
