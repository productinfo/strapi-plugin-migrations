import React, {useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
// import {Label} from '@buffetjs/core'
import {Checkbox, CheckboxWrapper, Label} from '@buffetjs/styles'
// import Checkbox from './Checkbox'
// import {List} from '@buffetjs/custom'
import List from './List'
import Wrapper from './Wrapper'
import TableRow from '../TableRow'
import WrapperList from "./WrapperList";
import {FormattedMessage} from 'react-intl'
import getTrad from "../../utils/getTrad";
import ContentTypeTableSubList from "../ContentTypeTableSubList";

const ContentTypeTable = ({
                            onModelChecked, onModelClicked, onConfigClicked, onConfigDelete, models, configs, selectedOption, selectedMenu, selectedConfigOption,
                            removeMigration, migrationDetail, runMigration
                          }) => {

  const [search, setSearch] = useState("");
  // console.log('modelOptions: ', models);
  const CustomRow = ({label, uid, checked, selectedMenu}) => {
    // console.log(label, uid, checked, selected);
    // const {label, uid, checked, selected} = row;
    console.log(selectedMenu);
    return (
      <TableRow
        selected={selectedMenu === 'models' ? selectedOption === uid : null}
        key={uid}
        className={['clickable']}>
        <a>
          <span
            style={{
              paddingTop: 18,
              display: 'flex',
              width: '150px',
              textAlign: 'right',
              flexGrow: 2,
            }}
            onClick={ev => {
              onModelClicked({uid})
            }}>{label}</span> &nbsp;
          <div style={{marginTop: 3, paddingTop: 18,}}>
            <CheckboxWrapper>
              <Label onClick={(e) => {
                // e.persist();
                // e.nativeEvent.stopImmediatePropagation();
                onModelChecked({uid, checked: !checked})
              }}>
                <Checkbox
                  name={uid}
                  onChange={() => {
                  }}
                  checked={checked}
                  style={{marginRight: 10}}
                />
              </Label>
            </CheckboxWrapper>
          </div>
        </a>
      </TableRow>
    )
  };

  CustomRow.propTypes = {
    label: PropTypes.string,
    uid: PropTypes.string,
    checked: PropTypes.bool,
    selected: PropTypes.bool,
    selectedMenu: PropTypes.string,
  };

  const props = {
    title: 'Ready to migrate',
    subtitle: 'List of content types available for migration',
    // button: {
    //   color: 'primary',
    //   // icon: 'content-type',
    //   icon: true,
    //   label: 'Add new Content Type',
    //   onClick: () => alert('Do you want to create a new chief entry?'),
    //   type: 'button',
    // },
  };

  const renderItem = (m, i) => {
    return (
      <CustomRow {...m} key={i} selectedMenu={selectedMenu}/>
    )
  };

  return (
    <Wrapper>
      <WrapperList>
        <div className={'list-header'}>
          <div className="title-wrapper">
            {/*<h3 style={{ 'padding-left': '1.2rem'}}>*/}
            <h3>
              <FormattedMessage id={getTrad(`menu.section.models.name.${models.length > 1 ? 'plural' : 'singular'}`)}/>
              &nbsp;&nbsp;
              <span className="count-info" datadescr={models.length}>
                {models.length}
              </span>
            </h3>
            {/*<button onClick={toggleSearch}>*/}
            {/*  <FontAwesomeIcon icon="search"/>*/}
            {/*</button>*/}
          </div>
        </div>
        <List>{models.map((m, i) => renderItem(m, i))}</List>
        <div className={'list-header'} style={{marginTop: '1.2rem'}}>
          <div className="title-wrapper">
            <h3>
              <FormattedMessage
                id={getTrad(`menu.section.migration.configs.name.${configs.length > 1 ? 'plural' : 'singular'}`)}/>
              &nbsp;&nbsp;
              <span className="count-info" datadescr={configs.length}>
                {configs.length}
              </span>
            </h3>
          </div>
        </div>
        <List>
          {configs.map((m, i) => <ContentTypeTableSubList
            key={i}
            {...m}
            migrationDetail={migrationDetail}
            runMigration={runMigration}
            removeMigration={removeMigration}
            onConfigClicked={onConfigClicked}
            onClickDelete={onConfigDelete}
            isFirstItem={i == 0}
            selectedMenu={selectedMenu}
            selectedConfigOption={selectedConfigOption}
          />)}
        </List>
      </WrapperList>
    </Wrapper>
  )
};

ContentTypeTable.propTypes = {
  onModelChecked: PropTypes.func,
  onModelClicked: PropTypes.func,
  onConfigClicked: PropTypes.func,
  onConfigDelete: PropTypes.func,
  models: PropTypes.array,
  configs: PropTypes.array,
  selectedOption: PropTypes.string,
  selectedConfigOption: PropTypes.object,
  selectedMenu: PropTypes.string,
  removeMigration: PropTypes.func,
  runMigration: PropTypes.func,
  migrationDetail: PropTypes.func,
};

ContentTypeTable.defaultProps = {
  configs: [],
  onConfigClicked: () => {
  },
  onConfigDelete: () => {
  },
  onModelClicked: () => {
  },
  removeMigration: () => {
  },
  runMigration: () => {
  },
  migrationDetail: () => {
  }
};

export default ContentTypeTable