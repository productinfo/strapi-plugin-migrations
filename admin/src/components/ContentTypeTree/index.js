import React, {useContext, useEffect, useState} from 'react';
import ListViewContext from "../../utils/ListViewContext";
import {ATTRIBUTES, EDIT_ATTRIBUTE, REMOVE_ATTRIBUTE, SHOW_DELETE_MODAL, TARGET} from "../../utils/constants";
import {get} from 'lodash'
import {ListWrapper, PopUpWarning, useGlobalContext} from 'strapi-helper-plugin'
import ListHeader from "../ListHeader";
import pluginId from "../../pluginId";
import ContentTypeList from "../ContentTypeList";
import TreeRow from "../TreeRow";
import FormModalEdit from "../FormModalEdit";
import convertAttrObjToArray from "../../utils/convertAttrObjToArray";
import getTrad from "../../utils/getTrad";
import {MODELS} from "../../../../../import-content/admin/src/utils/constants";

const ContentTypeTree = () => {
  const {emitEvent, formatMessage} = useGlobalContext();
  const {state, dispatch} = useContext(ListViewContext);
  const [attrsArray, updateAttrsArray] = useState([]);
  const [attributesLength, updateAttributesLength] = useState(0);
  const [listTitle, updateListTitle] = useState([]);
  const [showDeleteModal, toggleShowDeleteModal] = useState(false);
  const [showEditModal, toggleShowEditModal] = useState(false);
  const [fieldToEdit, updateFieldToEdit] = useState({});
  const [fieldToDelete, updateFieldToDelete] = useState({});

  const targetUid = get(state, [TARGET, 'uid'], "");
  const targetName = get(state, [TARGET, 'schema', 'name'], "");

  useEffect(() => {
    const attributesArray = convertAttrObjToArray(get(state, [ATTRIBUTES], {}));
    updateAttrsArray(attributesArray);
    const attributesLength = attributesArray.length;
    updateAttributesLength(attributesLength)
  }, [state]);

  // useEffect(() => {
  //   const showDeleteModal = get(state, [SHOW_DELETE_MODAL], false);
  //   toggleShowDeleteModal(showDeleteModal)
  // }, [state]);

  useEffect(() => {
    const title = formatMessage(
      {
        id: `${pluginId}.table.attributes.title.${
          attributesLength > 1 ? 'plural' : 'singular'
        }`,
      },
      {number: attributesLength}
    );
    title && updateListTitle([title])
  }, [attributesLength]);

  const onFormEdit = (val) => {
    const {editTarget, targetUid, targetName} = fieldToEdit;
    dispatch({type: EDIT_ATTRIBUTE, payload: {...val, editTarget, targetUid, targetName}});
    console.log('edit dispatch: ', state[MODELS]);
    toggleShowEditModal(false)
  };


  const showEdit = (fieldName, exportName, targetUid, targetName, editTarget) => {
    // console.log({fieldName, exportName, targetUid, targetName,editTarget});
    updateFieldToEdit({fieldName, exportName, targetUid, editTarget, targetName});
    toggleShowEditModal(true)
  };

  const showDelete = (fieldName, exportName, targetUid, targetName, editTarget) => {
    console.log({fieldName, exportName, targetUid, targetName, editTarget});
    updateFieldToDelete({attributeName: fieldName, exportName, targetUid, editTarget, targetName});
    toggleShowDeleteModal(true)
  };


  const CustomRow = props => {
    return (
      <TreeRow
        {...props}
        onClick={showEdit}
        onClickDelete={showDelete}
      />
    );
  };

  return (
    <ListWrapper style={{marginBottom: 80}}>
      <ListHeader title={listTitle}/>
      <PopUpWarning
        isOpen={showDeleteModal}
        toggleModal={() => toggleShowDeleteModal(false)}
        content={{
          title: getTrad('popUpWarning.bodyMessage.attribute.confirm'),
          message: getTrad('popUpWarning.bodyMessage.attribute.delete')
        }}
        popUpWarningType="danger"
        onConfirm={() => {
          dispatch({type: REMOVE_ATTRIBUTE, payload: fieldToDelete});
          console.log('delete dispatch: ', state[MODELS]);
          toggleShowDeleteModal(false)
        }}
      />
      <FormModalEdit
        isOpen={showEditModal}
        onFormSave={onFormEdit}
        onClose={() => toggleShowEditModal(false)}
        onToggle={() => toggleShowEditModal(prev => !prev)}
        fieldToEdit={fieldToEdit}
      />
      <ContentTypeList
        items={attrsArray}
        customRowComponent={props => <CustomRow {...props} />}
        editTarget={'contentType'}
        targetUid={targetUid}
        targetName={targetName}
      />
    </ListWrapper>
  )
};

ContentTypeTree.propTypes = {};


export default ContentTypeTree