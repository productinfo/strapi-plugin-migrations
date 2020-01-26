import React, {useEffect, useReducer, useState} from 'react';
import {reducer, store} from "../DataManagerProvider/reducer";
import {set, get, has, isEmpty, keys, omit, startCase, unset, cloneDeep, isEqual} from "lodash";
import {
  ATTRIBUTES,
  LOADING,
  MODELS,
  SCHEMA,
  SET_ATTRIBUTES,
  SET_COMPONENTS,
  SET_MODELS,
  SET_TARGET, SET_TARGET_INDEX, TARGET,
  TOGGLE_LOADING
} from "../../utils/constants";
import ListViewContext from "../../utils/ListViewContext";
import ContentTypeTree from "../../components/ContentTypeTree";
import {LoadingIndicator, request} from 'strapi-helper-plugin'
import ContentTypeTable from "../../components/ContentTypeTable";
import Row from '../../components/Row'
import Wrapper from './Wrapper'
import {Header} from '@buffetjs/custom'

const ExportData = () => {
  const [state, dispatch] = useReducer(reducer, store);
  const [generationLoading, toggleGenerationLoading] = useState(false);
  const [targetModelName, updateTargetModelName] = useState("");
  const [targetName, updateTargetName] = useState("");
  const [targetDescription, updateTargetDescription] = useState("");

  const [modelOptions, updateModelOptions] = useState([]);
  const [modelsToMigrate, updateModelsToMigrate] = useState([]);
  const [selectedOption, updateSelectedOption] = useState("");

  const [configOptions, updateConfigOptions] = useState([]);
  //   useState([
  //   {
  //     title: "18.3",
  //     models: [
  //       {uid: 'application::book.book', name: 'book'},
  //       {uid: 'application::contact.contact', name: 'contact'}
  //     ]
  //   },
  //   {
  //     title: "18.4",
  //     models: [
  //       {uid: 'application::book.book', name: 'book'},
  //       {uid: 'application::contact.contact', name: 'contact'}
  //     ]
  //   }
  // ]);
  useEffect(() => {
    setInterval(() => {
      getConfigs()
    }, 3000)
  }, []);

  const [selectedConfigOption, updateSelectedConfigOption] = useState({});
  const [targetConfigName, updateTargetConfigName] = useState(""); // the target migration
  const [selectedMenu, toggleSelectedMenu] = useState("models");

  const removeMigration = async (migration) => {
    console.log('remove', migration);
    try {
      const res = await request('/migrations/' + migration, {method: 'DELETE'});
      const newConfigOptions = configOptions.filter(c => {
        return c.title !== migration
      });
      updateConfigOptions(newConfigOptions);
      strapi.notification.success(`${migration} successfully removed.`)
    } catch (e) {
      console.log(e);
      strapi.notification.error(e.message)
    }
  };

  const migrationDetail = async (migration) => {
    console.log('detail');
    try {
      console.log('info', migration);
      const res = await request('/migrations/' + migration, {method: 'GET'});
      let ver;
      if (has(res, ['info'])) {
        ver = get(res, ['info', 'version'], "unknown version");
      }
      strapi.notification.info(`${ver} migration with ${get(res, ['types', 'count'], "?")} types and ${get(res, ['components', 'count'], "?")} components!`);
      console.log(res)
    } catch (e) {
      console.log(e);
      strapi.notification.error(e.message)
    }
  };

  const runMigration = async (migration) => {
    console.log('run');
    try {
      console.log('run', migration);
      const readRes = await request(`/migrations/${migration}/read`, {method: 'GET'});
      const res = await request(`/migrations/${migration}/actions/import`, {method: 'GET'});
      console.log(res);
      res.message && strapi.notification.success(res.message)
    } catch (e) {
      console.log(e);
      strapi.notification.error(e.message)
    }
  };

  const sendGenerateRequest = async () => {
    const req = {};
    const exports = [];
    const shapes = [];
    const models = get(state, [MODELS], []);
    try {
      modelsToMigrate.forEach(({label, uid}) => {
        const target = models.find(model => model.uid === uid);
        const targetName = get(target, [SCHEMA, "name"], "");
        const targetDesc = get(target, [SCHEMA, "description"], "");
        const exportAs = get(target, [SCHEMA, "exportAs"], startCase(targetName));
        const info = {name: targetName, description: targetDesc};
        /*FIXME*/
        const options = {
          "increments": true,
          "timestamps": true
        };
        let shape = cloneDeep(get(target, [SCHEMA], {}));
        /*TODO do the same for components...*/
        // console.log('isEqual:', isEqual(shape, get(target, [SCHEMA])));
        set(shape, ['info'], info);
        set(shape, ['options'], options);
        const newShape = omit(shape, ['name', 'description']);
        // console.log('from main:', newShape);
        const attrs = get(newShape, [ATTRIBUTES], {});
        const exportedKeys = Object.keys(attrs).filter(key => {
          if (has(attrs[key], ['exportName'])) return key
        });
        // console.log('exportedKeys: ', exportedKeys);
        exportedKeys.map(key => {
          const val = get(attrs, [key], {});
          const exportName = get(attrs, [key, 'exportName'], {});
          unset(attrs, [key]);
          delete val['exportName'];
          set(attrs, [exportName], val)
        });
        set(newShape, [ATTRIBUTES], attrs);
        // console.log('newShape: ', newShape);
        // const exportedKeys = keys(get(newShape,[ATTRIBUTES]))
        // const val = get(newShape, [ATTRIBUTES, attributeName], {});
        // unset(newState, [MODELS, targetIdx, SCHEMA, ATTRIBUTES, attributeName]);
        // set(newState, [MODELS, targetIdx, SCHEMA, ATTRIBUTES, exportName], val);
        exports.push(label);
        shapes.push({name: targetName, exportAs, shape: newShape});
      });
      toggleGenerationLoading(true);
      const res = await request('/migrations/actions/create?override=true', {
        method: "POST", body: {
          exports
        }
      });
      let ver;
      if (has(res, ['info'])) {
        ver = get(res, ['info', 'version'], "unknown version");
      }
      const createDataRes = await request(`/migrations/${ver}/actions/export`, {
        method: "POST", body: {
          filter: {}
        }
      });
      console.log('createResult:', createDataRes);
      // strapi.notification.info(`${ver} migration with ${get(res, ['types', 'count'], "?")} types and ${get(res, ['components', 'count'], "?")} components is ready!`);
      set(req, ["shapes"], shapes);
      // console.log('req:', req);
      const editResult = await request(`/migrations/${ver}`, {method: 'PATCH', body: req});
      console.log('editResult:', editResult);
      strapi.notification.success("Migration for " + ver + " successfully generated.");
      toggleGenerationLoading(false);
    } catch (e) {
      console.log(e);
      strapi.notification.error(e.message)
    }
  };


  const headerProps = {
    actions:
      [
        {
          color: 'cancel',
          onClick: () => {
          },
          title: 'Reset',
          type: 'button',
          // disabled: isEqual(modifiedData, initialData) ? true : false,
        },
        {
          className: 'button-submit',
          color: 'primary',
          onClick: () => {
            sendGenerateRequest()
          },
          title: generationLoading ? 'Generating...' : "Generate",
          type: 'submit',
          disabled: generationLoading,
        },
      ],
    title: {
      label: targetName,
      cta:
        {
          icon: 'pencil-alt',
          onClick: async () => {
            // await wait();
            //
            // if (firstMainDataPath === 'contentType') {
            //   emitEvent('willEditNameOfContentType');
            // }
            //
            // push({
            //   search: makeSearch({
            //     modalType: firstMainDataPath,
            //     actionType: 'edit',
            //     settingType: 'base',
            //     forTarget: firstMainDataPath,
            //     targetUid,
            //     headerDisplayName: label,
            //   }),
            // });
          },
        }
    },
    content: targetDescription ? targetDescription : "There is no description",
  };

  useEffect(() => {
    const modelsToMigrate = modelOptions.map(opt => {
      if (opt.checked) {
        const {label, uid} = opt;
        return {label, uid}
      }
    }).filter(obj => obj != undefined);
    updateModelsToMigrate(modelsToMigrate)
  }, [modelOptions]);

  /*1.receive models & components*/
  useEffect(() => {
    getComponents();
    getModels();
    getConfigs();
    // setTimeout(() => {
    dispatch({type: TOGGLE_LOADING, payload: false});
    // }, 1000)
  }, []);

  /*2.generate modelOptions*/
  // useEffect(() => {
  //
  // }, [state]);

  /*3.set targetModel to the first option*/
  // useEffect(() => {
  //   const opt = get(modelOptions, ["0", "value"], "");
  //   if (!isEmpty(opt)) {
  //     updateTargetModelName(opt);
  //   }
  // }, [modelOptions]);

  /*4.based on targetModel, fetch the model actual object & attributes*/
  useEffect(() => {
    const models = get(state, [MODELS], []);
    if (!models) return;
    const target = models.find(model => model.uid === targetModelName);
    const targetIdx = models.findIndex(model => model.uid === targetModelName);
    console.log('from ExportData: ', targetIdx);
    const targetName = target && get(target, [SCHEMA, 'name'], "");
    const targetDescription = target && get(target, [SCHEMA, 'description'], "There is no description");
    updateTargetName(targetName);
    updateTargetDescription(targetDescription);
    target && dispatch({type: SET_TARGET, payload: target});
    dispatch({type: SET_TARGET_INDEX, payload: {targetIdx: targetIdx.toString()}});
    const attrs = target && get(target, [SCHEMA, ATTRIBUTES], {});
    attrs && dispatch({type: SET_ATTRIBUTES, payload: attrs});
    // const attrs_array = attrs && convertAttrObjToArray(attrs); // todo move this to sub-components state
    // attrs_array && dispatch({type: SET_ATTRIBUTES_ARRAY, payload: attrs_array})
  }, [targetModelName]);


  // useEffect(() => {
  //   const target = get(state, [TARGET], []);
  //   if (!target) return;
  //   const targetName = get(target, [SCHEMA, 'name'], "");
  //   const targetDescription = get(target, [SCHEMA, 'description'], "There is no description");
  //   updateTargetName(targetName);
  //   updateTargetDescription(targetDescription)
  // }, [state]);

  const onSelectTarget = (targetModel) => {
    updateTargetModelName(targetModel)
  };

  const getComponents = async () => { // todo error
    const resp = await request("/content-type-builder/components", {method: "GET"});
    const components = {};
    get(resp, ["data"], [])
      .map(obj => {
        obj.uid ? components[obj.uid] = obj : null
      });
    dispatch({type: SET_COMPONENTS, payload: components});
  };

  const getModels = async () => { // todo error
    const response = await request("/content-type-builder/content-types", {
      method: "GET"
    });
    // Remove content types from models
    const models = get(response, ["data"], []).filter(
      obj => !has(obj, "plugin")
    );
    const modelOptions = models.map(model => {
      return {
        label: get(model, ["schema", "name"], ""),
        // value: model.uid,
        uid: model.uid,
        checked: true,
      }
    });
    dispatch({type: SET_MODELS, payload: models});
    updateModelOptions(modelOptions);
    const opt = get(modelOptions, ["0", "uid"], "");
    if (!isEmpty(opt)) {
      // console.log(opt);
      updateTargetModelName(opt);
      updateSelectedOption(opt)
    }
  };

  const getConfigs = async () => {
    const configs = await request('/migrations/', {method: 'GET'});
    console.log('migrations: ', configs);
    const configOptions = configs.map(c => {
        return {
          title: c.version,
          models: c.shapes.map(s => ({uid: "", name: s}))
        }
      }
    );
    updateConfigOptions(configOptions);
  };

  const onModelChecked = (val) => {
    // console.log(val);
    const {uid, checked} = val;
    const newModelOptions = modelOptions.map(opt => {
      if (opt.uid === uid) {
        opt.checked = checked;
      }
      return opt
    });
    // console.log(newModelOptions)
    updateModelOptions(newModelOptions)
  };

  const onModelClicked = (val) => {
    // console.log(val);
    // const newModelOptions = modelOptions.map(opt => {
    //   if (opt.uid === uid) {
    //     opt.selected = true;
    //   }
    //   return opt
    // });
    // updateModelOptions(newModelOptions);
    const {uid} = val;
    updateSelectedOption(uid);
    updateTargetModelName(uid);
    toggleSelectedMenu('models') // todo move to constants

  };

  const onConfigClicked = (val) => {
    console.log(val);
    const {uid, configTitle} = val; // todo now that we know which content type, which migration...
    updateSelectedConfigOption({uid, configTitle});
    updateTargetConfigName(configTitle);
    toggleSelectedMenu('configs') // todo move to constants
  };

  const onConfigDelete = (val) => {
    console.log(val)
  };

  return (
    <Wrapper>
      <ListViewContext.Provider value={{state, dispatch}}>
        <div className={'container-fluid'}>
          <div className={'row'}>
            <div className={'col-md-3'} style={{ paddingLeft: 20 }}>
              <ContentTypeTable
                models={modelOptions}
                configs={configOptions}
                onModelChecked={onModelChecked}
                onModelClicked={onModelClicked}
                onConfigClicked={onConfigClicked}
                onConfigDelete={onConfigDelete}
                selectedOption={selectedOption}
                selectedConfigOption={selectedConfigOption}
                selectedMenu={selectedMenu}
                removeMigration={removeMigration}
                runMigration={runMigration}
                migrationDetail={migrationDetail}
              />
            </div>
            <div className={'col-md-9 content'} style={{ backgroundColor: '#FAFAFB', paddingTop: 0 }}>
              {/*<Block*/}
              {/*  title="General"*/}
              {/*  description="Configure your content types for migration"*/}
              {/*  style={{marginBottom: 12}}*/}
              {/*>*/}
              {
                get(state, [LOADING], false) ? (
                  <LoadingIndicator/>
                ) : (
                  <>
                    {/*<Row>*/}

                    {/*</Row>*/}
                    {/*<Row className={"col-4 row"}>*/}
                    {/*  <Label htmlFor={"targetContentType"}>Select Content Type</Label>*/}
                    {/*  <Select*/}
                    {/*    name={"targetContentType"}*/}
                    {/*    options={modelOptions}*/}
                    {/*    value={targetModelName}*/}
                    {/*    onChange={({target: {value}}) =>*/}
                    {/*      onSelectTarget(value)}*/}
                    {/*  />*/}
                    {/*</Row>*/}
                    {/*<Row style={{display: 'flex', justifyContent: 'space'}}>*/}
                    {/*  <div className={'col-md-9'}>*/}

                    {/*  </div>*/}
                    {/*  <div className={'col-md-3'}>*/}
                    {/*    <Button color={'secondary'}>Reset</Button>*/}
                    {/*    <Button color={'success'}>Generate</Button>*/}
                    {/*  </div>*/}
                    {/*</Row>*/}
                    <Row>
                      {!isEmpty(modelOptions) && (
                        <div style={{paddingLeft: 13, paddingRight: 13}}>
                          <Header {...headerProps} />
                          <ContentTypeTree className={''}/>
                        </div>
                      )}
                    </Row>
                  </>
                )
              }
              {/*</Block>*/}
            </div>
          </div>
        </div>
      </ListViewContext.Provider>
    </Wrapper>
  )
};

export default ExportData