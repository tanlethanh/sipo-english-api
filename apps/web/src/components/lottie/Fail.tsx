import Lottie from 'react-lottie';

import animationData from './lottiejson/fail.json';

export function LottieFail({ width = 130, height = 130 }) {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		renderer: 'svg',
	};
	return <Lottie options={defaultOptions} height={height} width={width} />;
}
