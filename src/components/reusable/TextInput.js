/**
 * Created by krisztian on 25/09/16.
 */
import React, {PropTypes} from 'react';

const TextInput = ({name, label, onChange, onKeyPress, placeholder, value, type, error}) => {
    let wrapperClass = 'form-group';
    if (error && error.length > 0) {
        wrapperClass += " " + 'has-error';
    }

    return (
        <div className={wrapperClass}>
            <label htmlFor={name}>{label}</label>
            <div className="field">
                <input
                    type={type}
                    name={name}
                    className="form-control"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    />
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};

export default TextInput;
