import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import TableRow from "../TableRow";
import {Collapse} from 'reactstrap';
import Dropdown from "./DROPDOWN.JS";
import {Label} from '@buffetjs/core';

const ContentTypeTableSubList = ({
                                   title, models, isFirstItem, isSearching, onClickDelete, onConfigClicked, selectedMenu, selectedConfigOption,
                                   removeMigration, runMigration, migrationDetail
                                 }) => {
  const [collapse, setCollapse] = useState(isFirstItem);

  const toggle = () => {
    setCollapse(!collapse);
  };


  useEffect(() => {
    if (isSearching) {
      setCollapse(true);
    } else {
      setCollapse(isFirstItem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearching]);

  const CustomRow = ({uid, name, title, selectedConfigOption}) => {
    // console.log(label, uid, checked, selected);
    // const {label, uid, checked, selected} = row;
    return (
      <TableRow
        selected={selectedMenu === 'configs' ? selectedConfigOption.uid === uid && selectedConfigOption.configTitle === title : ""}
        onClick={ev => {
          // onConfigClicked({uid, configTitle: title})
        }}
        className={['clickable']}>
        <a>
          <span style={{paddingTop: 18}}>{name}</span> &nbsp;
        </a>
      </TableRow>
    )
  };

  CustomRow.propTypes = {
    label: PropTypes.string,
    uid: PropTypes.string,
    checked: PropTypes.bool,
    selected: PropTypes.bool,
  };

  return (
    models.length > 0 && (
      <Dropdown>
        <button
          onClick={toggle}
          className={`editable ${collapse ? 'is-open' : ''}`}
        >
          {title}
          <FontAwesomeIcon
            className="link-icon"
            icon={'info'}
            onClick={e => {
              migrationDetail(title);
              e.stopPropagation()
            }}
          />
          <FontAwesomeIcon
            className="link-icon"
            icon={'play'}
            onClick={e => {
              runMigration(title);
              e.stopPropagation()
            }}
          />
          <FontAwesomeIcon
            className="link-icon"
            icon={'trash'}
            onClick={e => {
              removeMigration(title);
              e.stopPropagation()
            }}
          />
        </button>
        <Collapse isOpen={collapse}
        >
          <ul>
            {models.map(m => {
              const {name} = m;
              return (
                <CustomRow
                  key={name}
                  title={title}
                  {...m}
                  selectedConfigOption={selectedConfigOption}
                />
              )
            })}
          </ul>
        </Collapse>
      </Dropdown>
    )
  )

};

ContentTypeTableSubList.defaultProps = {
  title: "",
  models: [],
  isFirstItem: false,
  isSearching: false,
  onClickDelete: () => {
  },
  onConfigClicked: () => {
  },
  removeMigration: () => {
  },
  runMigration: () => {
  },
  migrationDetail: () => {
  },
  selectedMenu: "",
  selectedConfigOption: "",
};

ContentTypeTableSubList.propTypes = {
  title: PropTypes.string,
  models: PropTypes.array,
  isFirstItem: PropTypes.bool,
  isSearching: PropTypes.bool,
  onClickDelete: PropTypes.func,
  onConfigClicked: PropTypes.func,
  selectedMenu: PropTypes.string,
  selectedConfigOption: PropTypes.object,
  removeMigration: PropTypes.func,
  runMigration: PropTypes.func,
  migrationDetail: PropTypes.func,
};

export default ContentTypeTableSubList;