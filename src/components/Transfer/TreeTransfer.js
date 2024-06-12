import React, { Fragment, useEffect, useState } from 'react';

import {
  Collapse,
  CollapseItem,
  IconButton,
  Input,
  RadioCheck,
  TextAlt,
} from 'components';
import PropTypes from 'prop-types';

const TreeTransfer = ({
  sources,
  targets,
  onChange,
  wrapperClassName,
  sourcesTitle,
  targetsTitle,
}) => {
  const [checkedSources, setCheckedSources] = useState([]);
  const [checkedTargets, setCheckedTargets] = useState([]);
  const [sourcesSearchText, setSourcesSearchText] = useState('');
  const [targetsSearchText, setTargetsSearchText] = useState('');
  const [isPropsLoaded, setIsPropsLoaded] = useState(false);

  const handleTransport = (state, id, subId) => {
    if (subId) {
      if (state === 'sources') {
        let source = checkedSources.find((item) => item.id === id);
        if (source) {
          if (source.childs.includes(subId)) {
            source.childs = source.childs.filter((child) => child !== subId);
          } else {
            source.childs.push(subId);
          }
          let otherSources = checkedSources.filter((item) => item.id !== id);
          if (source.childs.length === 0) {
            setCheckedSources(otherSources);
          } else {
            setCheckedSources([...otherSources, source]);
          }
        } else {
          setCheckedSources([...checkedSources, { id: id, childs: [subId] }]);
        }
      } else if (state === 'targets') {
        let target = checkedTargets.find((item) => item.id === id);
        if (target) {
          if (target.childs.includes(subId)) {
            target.childs = target.childs.filter((child) => child !== subId);
          } else {
            target.childs.push(subId);
          }
          let otherTargets = checkedTargets.filter((item) => item.id !== id);
          if (target.childs.length === 0) {
            setCheckedTargets(otherTargets);
          } else {
            setCheckedTargets([...otherTargets, target]);
          }
        } else {
          setCheckedTargets([...checkedTargets, { id: id, childs: [subId] }]);
        }
      }
    } else {
      if (state === 'sources') {
        if (checkedSources.find((item) => item.id === id)) {
          setCheckedSources(checkedSources.filter((item) => item.id !== id));
        } else {
          let source = sources.find((s) => s.id === id);
          if ('childrens' in source) {
            setCheckedSources([
              ...checkedSources,
              {
                id: source.id,
                childs: source.childrens?.map((child) => child.id),
              },
            ]);
          } else {
            setCheckedSources([
              ...checkedSources,
              {
                id: source.id,
                childs: undefined,
              },
            ]);
          }
        }
      } else if (state === 'allSources') {
        if (checkedSources.length === sources.length) {
          setCheckedSources([]);
        } else {
          setCheckedSources(
            sources.map((source) => ({
              id: source.id,
              childs: source.childrens?.map((child) => child.id),
            }))
          );
        }
      } else if (state === 'targets') {
        if (checkedTargets.find((item) => item.id === id)) {
          setCheckedTargets(checkedTargets.filter((item) => item.id !== id));
        } else {
          let target = targets.find((s) => s.id === id);
          if ('childrens' in target) {
            setCheckedTargets([
              ...checkedTargets,
              {
                id: target.id,
                childs: target.childrens?.map((child) => child.id),
              },
            ]);
          } else {
            setCheckedTargets([
              ...checkedTargets,
              {
                id: target.id,
                childs: undefined,
              },
            ]);
          }
        }
      } else if (state === 'allTargets') {
        if (checkedTargets.length === targets.length) {
          setCheckedTargets([]);
        } else {
          setCheckedTargets(
            targets.map((target) => ({
              id: target.id,
              childs: target.childrens?.map((child) => child.id),
            }))
          );
        }
      }
    }
  };

  const moveToTarget = (action) => {
    const filteredSources = sources.filter((source) =>
      checkedSources.some((cs) => source.id === cs.id)
    );
    const leftSources = sources.filter((source) => {
      const isChecked = checkedSources.find((cs) => source.id === cs.id);
      if (!isChecked) {
        return source;
      }
    });

    const movingItems = filteredSources
      .map((fs) => {
        let tempSource = { id: fs.id, label: fs.label };
        if (fs.childrens) {
          tempSource = { id: fs.id, label: fs.label, childrens: [] };

          const checkedSource = checkedSources.find((cs) => cs.id === fs.id);
          fs.childrens.map((fsc) => {
            checkedSource.childs.map((csc) => {
              if (fsc.id === csc) {
                tempSource.childrens.push(fsc);
              }
            });
          });
        }
        return tempSource;
      })
      .sort((a, b) => {
        return a.id - b.id;
      });
    const leftItems = filteredSources.map((fs) => {
      if (fs.childrens) {
        let tempSource = { id: fs.id, label: fs.label, childrens: [] };

        const checkedSource = checkedSources.find((cs) => cs.id === fs.id);
        fs.childrens.map((fsc) => {
          const isChildChecked = checkedSource.childs.includes(fsc.id);
          if (!isChildChecked) {
            tempSource.childrens.push(fsc);
          }
        });
        if (tempSource.childrens.length > 0) {
          return tempSource;
        }
      }
    });
    const newSources = [
      ...leftSources,
      ...leftItems.filter((li) => li !== undefined),
    ].sort((a, b) => {
      return a.id - b.id;
    });

    let newTargets = undefined;
    if (targets.length > 0) {
      const filteredTargets = targets.filter((target) =>
        movingItems.some((mi) => target.id === mi.id)
      );
      const leftTargets = targets.filter((target) => {
        const isExist = movingItems.find((mi) => target.id === mi.id);
        if (!isExist) {
          return target;
        }
      });
      const leftMovingItems = movingItems.filter((mi) => {
        const isExists = filteredTargets.find((ft) => mi.id === ft.id);
        if (!isExists) {
          return mi;
        }
      });

      const mergedTargets = filteredTargets.map((ft) => {
        const movingItem = movingItems.find((mi) => ft.id === mi.id);
        const tempTarget = {
          id: ft.id,
          label: ft.label,
          childrens: [...ft.childrens, ...movingItem.childrens],
        };
        return tempTarget;
      });

      newTargets = [...leftTargets, ...mergedTargets, ...leftMovingItems].sort(
        (a, b) => {
          return a.id - b.id;
        }
      );
    } else {
      newTargets = movingItems.sort((a, b) => {
        return a.id - b.id;
      });
    }

    setCheckedSources([]);
    setSourcesSearchText('');
    setTargetsSearchText('');
    onChange({ sources: newSources, targets: newTargets });
    if (action) {
      return [...newTargets];
    }
  };

  const moveToTargetWithParams = (data) => {
    const filteredSources = sources.filter((source) =>
      data.some((cs) => source.id === cs.id)
    );
    const leftSources = sources.filter((source) => {
      const isChecked = data.find((cs) => source.id === cs.id);
      if (!isChecked) {
        return source;
      }
    });
    const leftItems = filteredSources.map((fs) => {
      if (fs.childrens) {
        let tempSource = { id: fs.id, label: fs.label, childrens: [] };

        const checkedSource = data.find((cs) => cs.id === fs.id);
        fs.childrens.map((fsc) => {
          const isChildChecked = checkedSource.childs.includes(fsc.id);
          if (!isChildChecked) {
            tempSource.childrens.push(fsc);
          }
        });
        if (tempSource.childrens.length > 0) {
          return tempSource;
        }
      }
    });
    const newSources = [
      ...leftSources,
      ...leftItems.filter((li) => li !== undefined),
    ].sort((a, b) => {
      return a.id - b.id;
    });

    setCheckedSources([]);
    setSourcesSearchText('');
    setTargetsSearchText('');
    onChange({ sources: newSources, targets: targets });
    setIsPropsLoaded(true);
  };

  const moveToSource = () => {
    const filteredTargets = targets.filter((target) =>
      checkedTargets.some((ct) => target.id === ct.id)
    );
    const leftTargets = targets.filter((target) => {
      const isChecked = checkedTargets.find((ct) => target.id === ct.id);
      if (!isChecked) {
        return target;
      }
    });

    const movingItems = filteredTargets
      .map((ft) => {
        let tempTarget = { id: ft.id, label: ft.label };
        if (ft.childrens) {
          tempTarget = { id: ft.id, label: ft.label, childrens: [] };

          const checkedTarget = checkedTargets.find((ct) => ct.id === ft.id);
          ft.childrens.map((ftc) => {
            checkedTarget.childs.map((ctc) => {
              if (ftc.id === ctc) {
                tempTarget.childrens.push(ftc);
              }
            });
          });
        }
        return tempTarget;
      })
      .sort((a, b) => {
        return a.id - b.id;
      });
    const leftItems = filteredTargets.map((ft) => {
      if (ft.childrens) {
        let tempTarget = { id: ft.id, label: ft.label, childrens: [] };

        const checkedTarget = checkedTargets.find((ct) => ct.id === ft.id);
        ft.childrens.map((ftc) => {
          const isChildChecked = checkedTarget.childs.includes(ftc.id);
          if (!isChildChecked) {
            tempTarget.childrens.push(ftc);
          }
        });
        if (tempTarget.childrens.length > 0) {
          return tempTarget;
        }
      }
    });
    const newTargets = [
      ...leftTargets,
      ...leftItems.filter((li) => li !== undefined),
    ].sort((a, b) => {
      return a.id - b.id;
    });

    let newSources = undefined;
    if (sources.length > 0) {
      const filteredSources = sources.filter((source) =>
        movingItems.some((mi) => source.id === mi.id)
      );
      const leftSources = sources.filter((source) => {
        const isExist = movingItems.find((mi) => source.id === mi.id);
        if (!isExist) {
          return source;
        }
      });
      const leftMovingItems = movingItems.filter((mi) => {
        const isExists = filteredSources.find((fs) => mi.id === fs.id);
        if (!isExists) {
          return mi;
        }
      });

      const mergedSources = filteredSources.map((fs) => {
        const movingItem = movingItems.find((mi) => fs.id === mi.id);
        const tempSource = {
          id: fs.id,
          label: fs.label,
          childrens: [...fs.childrens, ...movingItem.childrens],
        };
        return tempSource;
      });

      newSources = [...leftSources, ...mergedSources, ...leftMovingItems].sort(
        (a, b) => {
          return a.id - b.id;
        }
      );
    } else {
      newSources = movingItems.sort((a, b) => {
        return a.id - b.id;
      });
    }

    setCheckedTargets([]);
    setSourcesSearchText('');
    setTargetsSearchText('');
    onChange({ sources: newSources, targets: newTargets });
  };

  const handleSourceSearch = () => {
    const filteredArray = [];
    if (sources) {
      sources.forEach((source) => {
        if (source.childrens) {
          const check = source.childrens.filter((child) =>
            child.label.includes(sourcesSearchText)
          );
          if (check.length > 0) {
            filteredArray.push(source);
          }
        } else {
          const check = source.label.includes(sourcesSearchText);
          if (check) {
            filteredArray.push(source);
          }
        }
      });
    }
    return filteredArray;
  };

  const handleTargetSearch = () => {
    const filteredArray = [];
    if (targets) {
      targets.forEach((target) => {
        if (target.childrens) {
          const check = target.childrens.filter((child) =>
            child.label.includes(targetsSearchText)
          );
          if (check.length > 0) {
            filteredArray.push(target);
          }
        } else {
          const check = target.label.includes(targetsSearchText);
          if (check) {
            filteredArray.push(target);
          }
        }
      });
    }
    return filteredArray;
  };

  useEffect(() => {
    if (sources && targets) {
      if (targets.length > 0 && isPropsLoaded === false) {
        const tempCheckedSources = [];
        targets.map((target) => {
          const tempData = {
            id: target.id,
            childs: [...target.childrens.map((child) => child.id)],
          };
          tempCheckedSources.push(tempData);
        });
        //setCheckedSources([...checkedSources, ...tempCheckedSources]);
        moveToTargetWithParams([...checkedSources, ...tempCheckedSources]);
        //moveToTarget();
      }
    }
  }, [targets]);

  return (
    <div className={`flex gap-x-2 ${wrapperClassName}`}>
      <div className="flex flex-col border border-default-border min-w-[166px]">
        <div className="flex flex-col w-full border-b border-default-border justify-between items-center px-2 gap-y-3">
          <div className="flex justify-between w-full items-center pt-3 px-2">
            <RadioCheck
              className="w-auto"
              type="checkbox"
              checked={
                sources
                  ? sources.length !== 0 &&
                    checkedSources.length === sources.length
                  : false
              }
              onChange={() => handleTransport('allSources')}
              disabled={sources ? sources.length === 0 : true}
            />
            <TextAlt className="tracking-wide w-auto whitespace-nowrap">
              {sourcesTitle}
            </TextAlt>
          </div>
          <div className="m-2 border border-default-border rounded-md">
            <Input
              value={sourcesSearchText}
              placeholder="Ara"
              onChange={(e) => setSourcesSearchText(e.target.value)}
              className=" px-3 rounded-full items-center max-w-[166px]"
              inputClassName="border-none rounded-full"
              inlineElement={
                <span>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
              }
              disabled={sources ? sources.length === 0 : true}
            />
          </div>
        </div>
        <div className="mt-5 px-2 py-0 gap-y-2 h-52 overflow-y-scroll">
          {handleSourceSearch().map((item) => (
            <Fragment key={item.id}>
              <div className="flex gap-x-2 items-center">
                <Collapse className="my-1">
                  <CollapseItem
                    className=""
                    collapseBarClassName=""
                    collapseContentClassName="flex flex-col pl-5"
                    isIconOnClick={true}
                    collapseBar={
                      <>
                        <RadioCheck
                          id={`transferItem-${item.id}`}
                          label={item.label}
                          type="checkbox"
                          checked={checkedSources.find(
                            (cs) => cs.id === item.id
                          )}
                          onChange={() => handleTransport('sources', item.id)}
                        />
                      </>
                    }
                    collapseContent={
                      item?.childrens?.length > 0
                        ? item?.childrens.map((child) => (
                            <RadioCheck
                              id={`transferItem-${child.id}`}
                              key={`transferItem-${child.id}`}
                              label={child.label}
                              type="checkbox"
                              checked={checkedSources
                                .find((cs) => cs.id === item.id)
                                ?.childs?.includes(child.id)}
                              onChange={() =>
                                handleTransport('sources', item.id, child.id)
                              }
                            />
                          ))
                        : null
                    }
                    collapsable={item?.childrens?.length > 0 ? true : false}
                  />
                </Collapse>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center gap-y-2">
        <IconButton
          className={`inline-flex items-center border p-3 border-primary-lighter hover:bg-primary-light hover:text-sky-light ${
            sources
              ? sources.length === 0
                ? 'cursor-not-allowed opacity-60'
                : ''
              : 'cursor-not-allowed opacity-60'
          }`}
          icon={<i className="fa-solid fa-chevron-right"></i>}
          onClick={moveToTarget}
          disabled={sources ? sources.length === 0 : true}
        />
        <IconButton
          className={`inline-flex items-center border p-3 border-primary-lighter hover:bg-primary-light hover:text-sky-light ${
            targets
              ? targets.length === 0
                ? 'cursor-not-allowed opacity-60'
                : ''
              : 'cursor-not-allowed opacity-60'
          }`}
          icon={<i className="fa-solid fa-chevron-left"></i>}
          onClick={moveToSource}
          disabled={targets ? targets.length === 0 : true}
        />
      </div>
      <div className="flex flex-col border border-default-border min-w-[166px]">
        <div className="flex flex-col w-full border-b border-default-border justify-between items-center px-2 gap-y-3">
          <div className="flex justify-between w-full items-center pt-3 px-2">
            <RadioCheck
              className="w-auto"
              type="checkbox"
              checked={
                targets
                  ? targets.length !== 0 &&
                    checkedTargets.length === targets.length
                  : false
              }
              onChange={() => handleTransport('allTargets')}
              disabled={targets ? targets.length === 0 : true}
            />
            <TextAlt className="tracking-wide w-auto whitespace-nowrap">
              {targetsTitle}
            </TextAlt>
          </div>
          <div className="m-2 border border-default-border rounded-md">
            <Input
              value={targetsSearchText}
              placeholder="Ara"
              onChange={(e) => setTargetsSearchText(e.target.value)}
              className=" px-3 rounded-full items-center max-w-[166px]"
              inputClassName="border-none rounded-full"
              inlineElement={
                <span>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
              }
              disabled={targets ? targets.length === 0 : true}
            />
          </div>
        </div>

        <div className="mt-5 px-2 py-0 gap-y-2 h-52 overflow-y-scroll">
          {handleTargetSearch().map((item) => (
            <Fragment key={item.id}>
              <div className="flex gap-x-2 items-center">
                <Collapse className="my-1">
                  <CollapseItem
                    className=""
                    collapseBarClassName=""
                    collapseContentClassName="flex flex-col pl-5"
                    isIconOnClick={true}
                    collapseBar={
                      <>
                        <RadioCheck
                          id={`transferItem-${item.id}`}
                          label={item.label}
                          type="checkbox"
                          checked={checkedTargets.find(
                            (ct) => ct.id === item.id
                          )}
                          onChange={() => handleTransport('targets', item.id)}
                        />
                      </>
                    }
                    collapseContent={
                      item?.childrens?.length > 0
                        ? item?.childrens.map((child) => (
                            <RadioCheck
                              id={`transferItem-${child.id}`}
                              key={`transferItem-${child.id}`}
                              label={child.label}
                              type="checkbox"
                              checked={checkedTargets
                                .find((cs) => cs.id === item.id)
                                ?.childs?.includes(child.id)}
                              onChange={() =>
                                handleTransport('targets', item.id, child.id)
                              }
                            />
                          ))
                        : null
                    }
                    collapsable={item?.childrens?.length > 0 ? true : false}
                  />
                </Collapse>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

TreeTransfer.propTypes = {
  sources: PropTypes.array,
  targets: PropTypes.array,
  onChange: PropTypes.func,
  wrapperClassName: PropTypes.string,
  sourcesTitle: PropTypes.string,
  targetsTitle: PropTypes.string,
};

export default TreeTransfer;
