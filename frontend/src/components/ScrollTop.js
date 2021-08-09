import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { HIDE_MENU } from '../constants/uiConstants'

const ScrollTop = () => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();

	useEffect(() => {
		window.scroll({
			top: 0,
			left: 0
		});

		dispatch({ type: HIDE_MENU });
	}, [pathname, dispatch]);
	return null;
};

export default ScrollTop;