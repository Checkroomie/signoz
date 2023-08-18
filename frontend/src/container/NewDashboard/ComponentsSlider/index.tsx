import { initialQueriesMap, PANEL_TYPES } from 'constants/queryBuilder';
import { queryParamNamesMap } from 'constants/queryBuilderQueryNames';
import { useUpdateDashboard } from 'hooks/dashboard/useUpdateDashboard';
import { useIsDarkMode } from 'hooks/useDarkMode';
import history from 'lib/history';
import { useDashboard } from 'providers/Dashboard';
import { CSSProperties, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducers';
import DashboardReducer from 'types/reducer/dashboards';
import { v4 as uuid } from 'uuid';

import menuItems from './menuItems';
import { Card, Container, Text } from './styles';

function DashboardGraphSlider(): JSX.Element {
	const isDarkMode = useIsDarkMode();

	const { handleToggleDashboardSlider } = useDashboard();

	const { dashboards } = useSelector<AppState, DashboardReducer>(
		(state) => state.dashboards,
	);

	const [selectedDashboard] = dashboards;
	const { data } = selectedDashboard;

	const updateDashboardMutation = useUpdateDashboard();

	const onClickHandler = useCallback(
		(name: PANEL_TYPES) => (): void => {
			const id = uuid();

			updateDashboardMutation.mutateAsync(
				{
					uuid: selectedDashboard.uuid,
					data: {
						...data,
						layout: [
							{
								i: id,
								w: 6,
								x: 0,
								h: 2,
								y: 0,
							},
							...(data.layout || []),
						],
						widgets: [
							...(data?.widgets || []),
							{
								id,
								title: '',
								description: '',
								isStacked: false,
								nullZeroValues: '',
								opacity: '',
								panelTypes: name,
								query: initialQueriesMap.metrics,
								timePreferance: 'GLOBAL_TIME',
							},
						],
					},
				},
				{
					onSuccess: (data) => {
						if (data.payload) {
							handleToggleDashboardSlider(false);

							history.push(
								`${history.location.pathname}/new?graphType=${name}&widgetId=${id}&${
									queryParamNamesMap.compositeQuery
								}=${encodeURIComponent(JSON.stringify(initialQueriesMap.metrics))}`,
							);
						}
					},
				},
			);
		},
		[
			data,
			handleToggleDashboardSlider,
			selectedDashboard.uuid,
			updateDashboardMutation,
		],
	);

	const fillColor: CSSProperties['color'] = isDarkMode ? 'white' : 'black';

	return (
		<Container>
			{menuItems.map(({ name, Icon, display }) => (
				<Card onClick={onClickHandler(name)} id={name} key={name}>
					<Icon fillColor={fillColor} />
					<Text>{display}</Text>
				</Card>
			))}
		</Container>
	);
}

export default DashboardGraphSlider;
