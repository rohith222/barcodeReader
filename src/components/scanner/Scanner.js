import React from 'react';
import Quagga from 'quagga';


class Scanner extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      code: [],
      isCheckout: false
    };
  }

  componentDidMount() {
    var self = this;

    Quagga.init({
      inputStream: {
        type: "LiveStream",
        target: document.querySelector('#yourElement'),
        constraints: {
          width: { min: 640 },
          height: { min: 480 },
          aspectRatio: { min: 1, max: 100 },
          facingMode: "environment"
        }
      },
      locator: {
        patchSize: "medium",
        halfSample: true
      },
      numOfWorkers: (navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4),
      decoder: {
        "readers": [
          { "format": "ean_reader", "config": {} }
        ]
      },
      locate: true,
    }, function (err) {
      if (err) {
        console.log(err);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected(function (result) {
      if (result.codeResult.code) {
        let data = self.state.code;

        if (!data.includes(result.codeResult.code)) {
          data.push(result.codeResult.code);
          self.setState({
            code: data
          });
        }
      }
    });

  };

  getVideo = () => {
    return (
      <div className='row'>
        <div className='col-6'>
          <div id='yourElement' />
        </div>
        <div className='col-6'>
          {this.state.code.map((item, index) =>
            <div className='row' style={{ marginBottom: 30 }} key={index}>
              <div className='col-3'>
                <img src="https://picsum.photos/200/300" className="img-fluid" />
              </div>
              <div className='col-6'>
                <div className='row'>
                  Name: {item}
                </div>
                <div className='row'>
                  Product: {item}
                </div>
                <div className='row'>
                  Price: {index + 1}
                </div>
              </div>
            </div>
          )}
          {
            this.state.code.length !== 0 ?
              <button type="button" className="btn btn-primary" onClick={() => { this.setState({ isCheckout: true }) }}>Checkout</button>
              : ''
          }
        </div>
      </div >
    );
  }

  getCheckoutPage = () => {
    Quagga.stop();
    return (
      <div>
        <p className="h1">Invoice</p>
        <div className='row'>
          <div className='col-4'>
            Total Product: {this.state.code.length}
          </div>
          <div className='col-4'>
            Total Price: {this.state.code.length * 4}
          </div>
          <div className='col-4'>
            <button type="button" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {
          this.state.isCheckout === true ? this.getCheckoutPage() : this.getVideo()
        }

      </div>
    );
  }
}

export default Scanner;