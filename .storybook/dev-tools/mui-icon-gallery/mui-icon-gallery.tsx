/**@jsx jsx */
/**@jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import {
  ChangeEvent,
  Fragment,
  JSXElementConstructor,
  useEffect,
  useState
} from 'react';
import {
  InputLabelProps,
  TextField
} from '@material-ui/core';
import * as icons from '@material-ui/icons';
import { throttle } from '@common/utilities';
import iconGalleryCss from './styles';

type OnChangeArgsType = ChangeEvent<HTMLInputElement>;
type IconItem = {
  icon: jsx.JSX.Element;
  name: string;
};

const MuiIcon = (Icon: JSXElementConstructor<any>, name: string) => (
  <div className="icon-gallery__item">
    <div className="icon-gallery__item--icon">
      <Icon fontSize="inherit" />
    </div>
    <span className="icon-gallery__item--name">{name}</span>
  </div>
);

export const IconExplorer = () => {
  const iconsArray: IconItem[] = Object.keys(icons).map((name: string) => {
    const icon = icons[name];
    return { icon: MuiIcon(icon, name), name };
  });
  const [filteredIconsArray, setFilteredIconsArray] = useState<IconItem[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    let newArr: IconItem[];
    if (searchText && searchText !== '') {
      newArr = iconsArray.filter((iconItem) => iconItem.name.toLowerCase()
        .includes(searchText.toLowerCase()));
    } else {
      newArr = [...iconsArray];
    }
    throttle(setFilteredIconsArray(newArr), 50);
  }, [searchText]);

  const onChange = (e: OnChangeArgsType) => {
    throttle(setSearchText(e.target.value), 50);
  };

  const inputLabelProps: InputLabelProps = {
    shrink: true,
  };

  return (
    <div css={iconGalleryCss}>
      <div className="icon-gallery">
        <div className="icon-gallery__icon-search">
          <div className="icon-gallery__icon-search-field">
            <TextField
              InputLabelProps={inputLabelProps}
              label="Begin typing to search icons:"
              onChange={onChange}
              type="text"
              fullWidth
              variant="filled"
              value={searchText} />
          </div>
        </div>
        <div className="icon-gallery__gallery-container">
          <div className="icon-gallery__gallery-items">
            {filteredIconsArray.map((muiIcon: any) => (
              <Fragment key={muiIcon.name}>
                {muiIcon.icon}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
