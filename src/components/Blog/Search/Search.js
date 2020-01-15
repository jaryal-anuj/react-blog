import React from 'react';
import classes from './Search.module.css';

function Search(props){

    return(
        <form className={classes.Search} onSubmit={(e)=>props.searchSubmitted(e)}>
            <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                <div className="input-group">
                <input 
                    type="search" 
                    placeholder="What're you searching for?" 
                    aria-describedby="button-addon1"
                    value={props.search}
                    onChange={(e)=>props.searchChange(e)} 
                    className="form-control border-0 bg-light" />
                <div className="input-group-append">
                    <button id="button-addon1" type="submit" className="btn btn-link text-primary"><i className="fa fa-search"></i></button>
                </div>
                </div>
            </div>
        </form>
    );
}
export default Search;