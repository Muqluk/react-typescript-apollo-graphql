const findParam = (seek: any) => window.location.search.toLowerCase().includes(seek.toLowerCase());
const getParam = (paramKey: any) => {
  const queryParams = window.location.search.toLowerCase();
  const param = queryParams.split('&').filter((p) => p.includes(paramKey))[0];
  const value = param.replace(/([a-z?=])/g, '');
  return value.length >= 1 ? value : 'nocomparatorprovided';
};

const Helpers = {
  isObject: (obj: any) => {
    if (typeof obj === 'string') return false;
    if (typeof obj === 'number') return false;
    if (typeof obj === 'function') return false;
    if (typeof obj === 'boolean') return false;
    if (!obj) return false;
    if (Array.isArray(obj)) return false;
    return true;
  },
  isDefined: (value: any) => (typeof value !== 'undefined' && value !== 'null'),
  compareObjects: (myObj: any, tgtObj: any) => {
    Object.keys(tgtObj).forEach((key) => {
      if (Helpers.isDefined(myObj[key])) {
        if (Helpers.isObject(myObj[key])) {
          Helpers.compareObjects(myObj[key], tgtObj[key]);
        }
      } else {
        myObj[key] = tgtObj[key] // eslint-disable-line
      }
    });
  },
  debug: {
    checkQueryStrFor: (seek: any) => (findParam(seek)),
    checkQueryStrForAndReturn: (seek: any) => (findParam(seek) ? getParam(seek) : false),
  },
};
export default Helpers;
