import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import Result from "./Result";

export default class Results extends PureComponent {
    static propTypes = {
        results: PropTypes.array
    };

    render() {
        return (
            <div className="component-results">
                {this.props.results.map(result => (
                    <div key={result.slug}>
                        <Result
                            display_name={result.display_name}
                            manufacturer={result.manufacturer.display_name}
                            categories={result.categories}
                            price={result.price}
                            picture={result.picture}
                            stock_count={result.stock_count}
                            description={result.description}
                            links={result.links}
                            slug={result.slug}
                        />
                    </div>
                ))}
            </div>
        );
    }
}
