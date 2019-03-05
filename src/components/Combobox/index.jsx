import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'react-autocomplete';
import debounce from 'debounce';

import { searchAll } from '../../redux-modules/search/service';
import './index.scss';

/*
  Refactor this to be resuable
  Lifted from my brittle implementation for a coding exercise
*/

const runApi = (searchClause, resultsFn) => {
  
  searchAll(searchClause)
    .then(res => resultsFn(res));
  
  // console.log('calling the api with ', searchClause);
}

const Combobox = ({
  debounceTime,
}) => {
  const [searchClause, setSearchClause] = useState('');
  const [results, setResults] = useState([]);

  return (
    <div className="search-box-wrapper">
      <Autocomplete
        onChange={e => {
          setSearchClause(e.target.value);
          debounce(runApi(e.target.value, setResults), debounceTime);
        }}
        getItemValue={item => item.name}
        renderItem={(item, highlighted) => (
          <div
            className={`search-result ${highlighted ? 'highlighted' : ''}`}
            key={item.name}
          >
            {item.name}
          </div>
        )}
        value={searchClause}
        items={results}
        autoHighlight={true}
        inputProps={{
          placeholder: "What are you looking for?",
          className: "search-box",
        }}
        wrapperStyle={{ width: '100%' }}
        menuStyle={{
          width: '100%',
          boxShadow: '0px 4px 5px 1px rgba(0, 0, 0, 0.3)',
        }}
        onSelect={item => {
          setSearchClause(item);
          setResults([]);
        }}
      />
    </div>
  );
};

Combobox.propTypes = {
  debounceTime: PropTypes.number,
};

Combobox.defaultProps = {
  debounceTime: 200,
};

export default Combobox;
