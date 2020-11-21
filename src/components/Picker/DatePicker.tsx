import React, { PureComponent } from 'react';
import Picker, { OptionGroups, ValueGroups } from './Picker';

interface DatePickerProps {
  minDate?: Date;
  maxDate?: Date;
  value?: Date;

  label?: {
    year?: string;
    month?: string;
    day?: string;
  };

  title?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: (date: Date) => void;
  onCancel?: () => void;
}
interface DatePickerState {
  defaultValue?: Date;

  optionGroups: OptionGroups<{
    year: number;
    month: number;
    day: number;
  }>;
  valueGroups: ValueGroups<{
    year: number;
    month: number;
    day: number;
  }>;
}

const MONTH_DAYS = [
  /* January */ 31,
  /* February */ 28,
  /* March */ 31,
  /* April */ 30,
  /* May */ 31,
  /* June */ 30,
  /* July */ 31,
  /* August */ 31,
  /* September */ 30,
  /* October */ 31,
  /* November */ 30,
  /* December */ 31,
];

const DEFAULT_MIN_DATE = new Date(1900, 0, 1); // 1900/01/01
const DEFAULT_MAX_DATE = new Date(2049, 11, 31); // 2049/12/31

class DatePicker extends PureComponent<DatePickerProps, DatePickerState> {
  public static defaultProps = {
    minDate: DEFAULT_MIN_DATE,
    maxDate: DEFAULT_MAX_DATE,

    label: {
      year: '年',
      month: '月',
      day: '日',
    },
  };

  public static getDerivedStateFromProps(
    props: DatePickerProps,
    state: DatePickerState,
  ): Partial<DatePickerState> | null {
    if (props.value !== state.defaultValue) {
      const { value } = props;

      return {
        defaultValue: value,
        valueGroups: {
          year: value?.getFullYear(),
          month: value?.getMonth(),
          day: value?.getDate(),
        },
      };
    }
    return null;
  }

  constructor(props: DatePickerProps) {
    super(props);

    this.state = {
      optionGroups: {},
      valueGroups: {},
    };
  }

  public componentDidMount() {
    this.buildDate();
  }

  public onChange = (type: string, value: number) => {
    this.setState(
      ({ valueGroups }) => ({
        valueGroups: {
          ...valueGroups,
          [type]: value,
        },
      }),
      () => this.buildDate(),
    );
  };

  public onConfirm = () => {
    const { onConfirm } = this.props;
    const { valueGroups } = this.state;
    if (onConfirm) {
      onConfirm(new Date(valueGroups.year!, valueGroups.month!, valueGroups.day));
    }
  };

  private isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  private buildDate() {
    this.setState({
      optionGroups: {
        year: this.buildYears(),
        month: this.buildMonths(),
        day: this.buildDays(),
      },
    });
  }

  private range<T>(start: number, end: number, fn?: (i: number) => T): T[] {
    const list: T[] = [];

    for (let i = start; i <= end; i += 1) {
      list.push(fn ? fn(i) : (i as any));
    }

    return list;
  }

  private buildYears() {
    const { minDate, maxDate, label } = this.props;
    const startYear = minDate!.getFullYear();
    const endYear = maxDate!.getFullYear();
    const labelYear = label?.year || '';

    return this.range(startYear, endYear, (year) => ({
      text: `${year}${labelYear}`,
      value: year,
    }));
  }

  private buildMonths() {
    const { minDate, maxDate, label } = this.props;
    const { valueGroups } = this.state;
    const minYear = minDate!.getFullYear();
    const minMonth = minDate!.getMonth();
    const maxYear = maxDate!.getFullYear();
    const maxMonth = maxDate!.getMonth();
    const currYear = valueGroups.year;
    const labelMonth = label?.month || '';

    const startMonth = currYear && currYear === minYear ? minMonth : 0;
    const endMonth = currYear && currYear === maxYear ? maxMonth : 11;

    return this.range(startMonth, endMonth, (month) => ({
      text: `${month + 1}${labelMonth}`,
      value: month,
    }));
  }

  private buildDays() {
    const { minDate, maxDate, label } = this.props;
    const { valueGroups } = this.state;
    const minYear = minDate!.getFullYear();
    const minMonth = minDate!.getMonth();
    const minDay = minDate!.getDate();
    const maxYear = maxDate!.getFullYear();
    const maxMonth = maxDate!.getMonth();
    const maxDay = maxDate!.getDate();
    const currYear = valueGroups.year;
    const currMonth = valueGroups.month;
    const labelDay = label?.day || '';

    let startDay = 1;
    let endDay = 31;

    if (currYear === minYear && currMonth === minMonth) {
      startDay = minDay;
    }

    if (currYear === maxYear && currMonth === maxMonth) {
      endDay = maxDay;
    } else if (currYear && currMonth === 1 && this.isLeapYear(currYear)) {
      endDay = 29;
    } else if (currMonth) {
      endDay = MONTH_DAYS[currMonth];
    }

    return this.range(startDay, endDay, (day) => ({
      text: `${day}${labelDay}`,
      value: day,
    }));
  }

  public render() {
    const { minDate, maxDate, value, ...props } = this.props;
    const { optionGroups, valueGroups } = this.state;

    return (
      <Picker
        {...props}
        optionGroups={optionGroups}
        valueGroups={valueGroups}
        onConfirm={this.onConfirm}
        onChange={this.onChange}
      />
    );
  }
}

export default DatePicker;
