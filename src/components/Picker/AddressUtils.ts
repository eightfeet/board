/*
 * BY-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
import memoizeOne from 'memoize-one';
import Loading from '~/components/Loading';
import loadScript from '~/core/loadScript';

declare global {
  interface Window {
    BY_HEALTH_REGIONS?: RegionDataSource;
  }
}

export function dataProvider() {
  if (window.BY_HEALTH_REGIONS) {
    return Promise.resolve(window.BY_HEALTH_REGIONS);
  }

  return Loading.using(() =>
    loadScript(process.env.REACT_APP_REGIONS_JS!).then(() => {
      if (!window.BY_HEALTH_REGIONS) {
        throw new Error('加载地址失败，请检查您的网络是否正常。');
      }
      return window.BY_HEALTH_REGIONS;
    }),
  );
}

export interface Region {
  id: string;
  name: string;
}
export interface RegionDataSource {
  [region: string]: {
    [code: string]: string;
  };
}
export const ROOT_REGION = '00';
export const EMPTY_REGION = [{ id: '-1', name: '' }];

export const transformRegion = memoizeOne((regionData: RegionDataSource, code?: string): Region[] => {
  if (!code || !regionData[code]) return EMPTY_REGION;

  const values = regionData[code];
  return Object.keys(values).map(
    (key) =>
      ({
        id: key,
        name: values[key],
      } as Region),
  );
});

export const transformOption = memoizeOne((regions: Region[]) =>
  regions.map((x) => ({
    text: x.name,
    value: x,
  })),
);

export function firstOrDefault<T>(source: T[], predicate: (value: T) => boolean) {
  return source.filter(predicate)[0] || source[0];
}

export function findRegion(regionData: RegionDataSource, provinceId?: string, cityId?: string, areaId?: string) {
  const provinceData = transformRegion(regionData, ROOT_REGION);
  const province = firstOrDefault(provinceData, (x) => x.id === provinceId);

  const cityData = transformRegion(regionData, province.id);
  const city = firstOrDefault(cityData, (x) => x.id === cityId);

  const areaData = transformRegion(regionData, city.id);
  const area = firstOrDefault(areaData, (x) => x.id === areaId);

  return {
    optionGroups: {
      province: transformOption(provinceData),
      city: transformOption(cityData),
      area: transformOption(areaData),
    },
    valueGroups: {
      province,
      city,
      area,
    },
  };
}
