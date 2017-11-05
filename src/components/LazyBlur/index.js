import React, { Component } from 'react';
import { bool, string, oneOf, node } from 'prop-types';
import styled from 'react-emotion';

const Container = styled.div`
	background: ${({ url }) => `#e52 no-repeat 100% url(${url})`};
    background-repeat: no-repeat;
    background-size: cover;
`;

const Wrapper = styled.div`
    height: 100vh;
`;


class BlurUp extends Component {
	constructor(props) {
		super(props);

		this.onLoadPlaceholder = this.onLoadPlaceholder.bind(this);
		this.onLoadImage = this.onLoadImage.bind(this);

		this.state = {};
	}

	onLoadPlaceholder() {
		this.setState({
			isPlaceholderLoaded: true,
		});
	}

	onLoadImage() {
		this.setState({
			isImageLoaded: true,
		});
	}

	render() {
		const {
			background,
			url,
			placeholderURL,
			aspectRatio,
		} = this.props;

		const { isPlaceholderLoaded, isImageLoaded } = this.state;

		const ratio = (aspectRatio || '16:9').replace(/:/, 'x');

		const placeholderImageContainerClasses = [
			'blur-up__aspect-ratio--object',
			'blur-up__blur',
			'blur-up__animation',
			isImageLoaded ? 'blur-up__animation--fade-out' : null,
		].join(' ');

		const placeholderImageContainer = isPlaceholderLoaded ?
			(<Container className={placeholderImageContainerClasses} url={url} />) :
			null;

		const image = isPlaceholderLoaded ?
			(<img src={url} onLoad={this.onLoadImage} alt="presentation" />) :
			null;

		const imageContainer = isImageLoaded ?
			(<Container
  className="blur-up__aspect-ratio--object"
  url={url}
			/>) :
			null;

		return (
  <Wrapper>
    <span className={(background) ? 'fixed-bg blur-up__hidden' : 'blur-up__hidden'}>
      <img
        src={placeholderURL}
        onLoad={this.onLoadPlaceholder}
        alt="presentation"
      />
      {image}
    </span>
    <div className={(this.props.background) ? `fixed-bg blur-up__aspect-ratio blur-up__aspect-ratio--${ratio}` : `blur-up__aspect-ratio blur-up__aspect-ratio--${ratio}`}>
      {imageContainer}
      {placeholderImageContainer}
    </div>
    {this.props.children}
  </Wrapper>
		);
	}
}

// children need to go into a container that has a BG image
BlurUp.defaultProps = {
	background: false,
};

BlurUp.propTypes = {
	background: bool,
	url: string.isRequired,
	placeholderURL: string.isRequired,
	aspectRatio: oneOf([
		'16:9',
		'4:3',
		'6:4',
		'8:5',
		'7:5',
		'1:1',
	]).isRequired,
	children: node,
};

export default BlurUp;
