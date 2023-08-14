import { useTranslation } from 'react-i18next';

import { FieldTitle } from '../styles';
import { OptionsMenuConfig } from '../types';
import { FormatFieldWrapper, RadioButton, RadioGroup } from './styles';

function FormatField({ config }: FormatFieldProps): JSX.Element | null {
	const { t } = useTranslation(['trace']);

	if (!config) return null;

	return (
		<FormatFieldWrapper direction="vertical">
			<FieldTitle>{t('options_menu.format')}</FieldTitle>
			<RadioGroup
				size="small"
				buttonStyle="solid"
				value={config.value}
				onChange={config.onChange}
			>
				<RadioButton value="raw">{t('options_menu.raw')}</RadioButton>
				<RadioButton value="list">{t('options_menu.default')}</RadioButton>
				<RadioButton value="table">{t('options_menu.column')}</RadioButton>
			</RadioGroup>
		</FormatFieldWrapper>
	);
}

interface FormatFieldProps {
	config: OptionsMenuConfig['format'];
}

export default FormatField;
