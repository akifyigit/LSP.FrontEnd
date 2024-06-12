import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import IconButton from 'components/IconButton';
import Input from 'components/Input';
import RadioCheck from 'components/RadioCheck';
import { TextAlt } from 'components/Text';
import PropTypes from 'prop-types';

const Transfer = ({
  sources,
  targets,
  isEdit = false,
  onChange,
  wrapperClassName,
  sourcesTitle,
  targetsTitle,
}) => {
  const [checkedSources, setCheckedSources] = useState([]);
  const [checkedTargets, setCheckedTargets] = useState([]);
  const [sourcesSearchText, setSourcesSearchText] = useState('');
  const [targetsSearchText, setTargetsSearchText] = useState('');

  const handleTransport = (state, id) => {
    if (state === 'sources') {
      if (checkedSources.includes(id)) {
        setCheckedSources(checkedSources.filter((item) => item !== id));
      } else {
        setCheckedSources([...checkedSources, id]);
      }
    } else if (state === 'allSources') {
      if (checkedSources.length === sources.length) {
        setCheckedSources([]);
      } else {
        setCheckedSources(sources.map((source) => source.id));
      }
    } else if (state === 'targets') {
      if (checkedTargets.includes(id)) {
        setCheckedTargets(checkedTargets.filter((item) => item !== id));
      } else {
        setCheckedTargets([...checkedTargets, id]);
      }
    } else if (state === 'allTargets') {
      if (checkedTargets.length === targets.length) {
        setCheckedTargets([]);
      } else {
        setCheckedTargets(targets.map((target) => target.id));
      }
    }
  };

  const moveToTarget = () => {
    const movingItems = sources.filter((source) => {
      return checkedSources.some((cs) => {
        return source.id === cs;
      });
    });
    const newSources = sources.filter(
      (source) => !checkedSources.some((cs) => source.id === cs)
    );
    const newTargets = [...targets, ...movingItems];
    setCheckedSources([]);
    setSourcesSearchText('');
    setTargetsSearchText('');
    onChange({ sources: newSources, targets: newTargets });
  };

  const moveToSource = () => {
    const movingItems = targets.filter((target) => {
      return checkedTargets.some((ct) => {
        return target.id === ct;
      });
    });
    const newTargets = targets.filter(
      (target) => !checkedTargets.some((ct) => target.id === ct)
    );
    const newSources = [...sources, ...movingItems];
    setCheckedTargets([]);
    setSourcesSearchText('');
    setTargetsSearchText('');
    onChange({ sources: newSources, targets: newTargets });
  };

  const handleSourceSearch = () => {
    return sources.filter((source) => source.label.includes(sourcesSearchText));
  };

  const handleTargetSearch = () => {
    return targets.filter((target) => target.label.includes(targetsSearchText));
  };

  useEffect(() => {
    if (isEdit) {
      const tempSources = [];
      sources.map((source) => {
        let isMatched = false;
        targets.map((target) => {
          if (source.id === target.id) {
            isMatched = true;
          }
        });
        if (isMatched === false) {
          tempSources.push(source);
        }
      });
      onChange({ sources: tempSources, targets: targets });
    }
  }, [isEdit]);

  return (
    <div className={`flex gap-x-2 ${wrapperClassName}`}>
      <div className="flex flex-col border border-default-border min-w-[200px]">
        <div className="flex flex-col w-full border-b border-default-border justify-between items-center px-2 gap-y-3">
          <div className="flex justify-between w-full items-center pt-3 px-2">
            <RadioCheck
              className="w-auto"
              type="checkbox"
              checked={
                sources.length !== 0 && checkedSources.length === sources.length
              }
              onChange={() => handleTransport('allSources')}
              disabled={sources.length === 0}
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
              disabled={sources.length === 0}
            />
          </div>
        </div>
        <div className="mt-5 px-2 py-0 gap-y-2 h-52 overflow-y-scroll">
          {handleSourceSearch().map((item) => (
            <RadioCheck
              className="border border-default-border px-2 py-3 my-2"
              id={`transferItem-${item.id}`}
              key={item.id}
              label={item.label}
              type="checkbox"
              checked={checkedSources.includes(item.id)}
              onChange={() => handleTransport('sources', item.id)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center gap-y-2">
        <IconButton
          className={`inline-flex items-center border p-3 border-green-lighter hover:bg-green-light hover:text-sky-light ${
            sources.length === 0 ? 'cursor-not-allowed opacity-60' : ''
          }`}
          icon={<i className="fa-solid fa-chevron-right"></i>}
          onClick={moveToTarget}
          disabled={sources.length === 0}
        />
        <IconButton
          className={`inline-flex items-center border p-3 border-green-lighter hover:bg-green-light hover:text-sky-light ${
            targets.length === 0 ? 'cursor-not-allowed opacity-60' : ''
          }`}
          icon={<i className="fa-solid fa-chevron-left"></i>}
          onClick={moveToSource}
          disabled={targets.length === 0}
        />
      </div>
      <div className="flex flex-col border border-default-border min-w-[200px]">
        <div className="flex flex-col w-full border-b border-default-border justify-between items-center px-2 gap-y-3">
          <div className="flex justify-between w-full items-center pt-3 px-2">
            <RadioCheck
              className="w-auto"
              type="checkbox"
              checked={
                targets.length !== 0 && checkedTargets.length === targets.length
              }
              onChange={() => handleTransport('allTargets')}
              disabled={targets.length === 0}
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
              disabled={targets.length === 0}
            />
          </div>
        </div>

        <div className="mt-5 px-2 py-0 gap-y-2 h-52 overflow-y-scroll">
          {handleTargetSearch().map((item) => (
            <RadioCheck
              className="border border-default-border px-2 py-3 my-2"
              id={`transferItem-${item.id}`}
              key={item.id}
              label={item.label}
              type="checkbox"
              checked={checkedTargets.includes(item.id)}
              onChange={() => handleTransport('targets', item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

Transfer.propTypes = {
  sources: PropTypes.array,
  targets: PropTypes.array,
  isEdit: PropTypes.bool,
  onChange: PropTypes.func,
  wrapperClassName: PropTypes.string,
  sourcesTitle: PropTypes.string,
  targetsTitle: PropTypes.string,
};

export default Transfer;
