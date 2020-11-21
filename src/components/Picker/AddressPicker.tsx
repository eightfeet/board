import React, { PureComponent } from 'react';
import Picker, { OptionGroups, ValueGroups } from './Picker';
import { findRegion, dataProvider, RegionDataSource, Region } from './AddressUtils';

export interface AddressData {
  province: Region;
  city: Region;
  area: Region;
}

interface AddressPickerProps {
  provinceId?: string;
  cityId?: string;
  areaId?: string;

  title?: string;
  confirmText?: string;
  cancelText?: string;

  Provider: () => Promise<RegionDataSource>;

  onConfirm?: (values: ValueGroups<AddressData>) => void;
  onCancel?: () => void;
  onError?: (error: Error) => void;
}
interface AddressPickerState {
  ready: boolean;

  optionGroups: OptionGroups<AddressData>;
  valueGroups: ValueGroups<AddressData>;
}

class AddressPicker extends PureComponent<AddressPickerProps, AddressPickerState> {
  public static defaultProps = {
    Provider: dataProvider,
  };

  constructor(props: AddressPickerProps) {
    super(props);

    this.state = {
      ready: false,

      optionGroups: {},
      valueGroups: {},
    };
  }

  public componentDidMount() {
    const { provinceId, cityId, areaId } = this.props;
    this.updateRegion(provinceId, cityId, areaId);
  }

  private onChange = (type: string, value: Region) => {
    const { valueGroups } = this.state;
    let provinceId;
    let cityId;
    let areaId;

    switch (type) {
      case 'province':
        provinceId = value.id;
        break;
      case 'city':
        provinceId = valueGroups!.province!.id;
        cityId = value.id;
        break;
      default:
        provinceId = valueGroups!.province!.id;
        cityId = valueGroups!.city!.id;
        areaId = value.id;
        break;
    }

    this.updateRegion(provinceId, cityId, areaId);
  };

  private onConfirm = () => {
    const { onConfirm } = this.props;
    const { valueGroups } = this.state;
    if (onConfirm) {
      onConfirm(valueGroups);
    }
  };

  private updateRegion(provinceId?: string, cityId?: string, areaId?: string) {
    const { Provider } = this.props;

    return Provider()
      .then((regionData) => {
        this.setState({
          ready: true,
          ...findRegion(regionData, provinceId, cityId, areaId),
        });
      })
      .catch((error) => {
        const { onError } = this.props;
        if (!onError) {
          throw error;
        }

        onError(error);
      });
  }

  public render() {
    const { ready, optionGroups, valueGroups } = this.state;

    return (
      ready && (
        <Picker
          {...this.props}
          optionGroups={optionGroups}
          valueGroups={valueGroups}
          onChange={this.onChange}
          onConfirm={this.onConfirm}
        />
      )
    );
  }
}

export default AddressPicker;
