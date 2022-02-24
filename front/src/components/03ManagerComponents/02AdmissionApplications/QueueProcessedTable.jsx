import React, { Component } from 'react';
import Table from '../../05ReusableComponents/Table';

class QueueProcessedTable extends Component {
  columns = [
    {
      key: 'id',
      path: 'id',
      label: '#',
      content: application => <span> {application.id}</span>
    },
    {
      key: 'childPersonalCode',
      path: 'childPersonalCode',
      label: 'Vaiko asmens kodas',
      content: application => <span> {application.childPersonalCode}</span>
    },
    {
      key: 'name',
      path: 'name',
      label: 'Vaiko vardas, pavardė',
      content: application => <span> {application.childName} {application.childSurname}</span>
    },
    {
      key: 'status',
      path: 'status',
      label: 'Prašymo statusas',
      content: application => <span> {application.status ? application.status : "-"} </span>
    },
    {
      key: 'kindergartenName',
      path: 'kindergartenName',
      label: 'Darželio pavadinimas',
      content: application => <span> {application.kindergartenName ? application.kindergartenName : "-"} </span>
    },
    {
      key: 'numberInWaitingList',
      path: 'numberInWaitingList',
      label: 'Laukiančiųjų eilės numeris',
      content: application => <span> {application.numberInWaitingList ? application.numberInWaitingList : "-"} </span>
    },
    {
      key: 'veiksmai',
      label: 'Veiksmai',
      content: application =>
        <div className="d-flex justify-content-center">
          <button
            id="btnReviewApplicationManager"
            className="btn btn-primary btn-sm btn-block me-2"
            onClick={() => this.props.handleApplicationReview(application.id)}
          >Peržiūrėti
          </button>

          {application.status === "Patvirtintas" &&
            <button
              id="btnDownloadContractManager"
              className="btn btn-success btn-sm btn-block"
              onClick={() => this.props.handleContractDownload(application)}
            >Parsisiųsti
            </button>
          }
          {(application.status === "Laukiantis" || application.status === "Pateiktas") &&
            <button
              id="btnDeactivateApplication"
              className="btn btn-danger btn-sm btn-block"
              onClick={() => this.props.onDeactivate(application)}
              disabled={application.status === 'Neaktualus' || application.status === 'Patvirtintas'}
            >Atmesti
            </button>
          }
        </div>
    }
  ]

  render() {

    return (
      <Table
        columns={this.columns}
        data={this.props.applications}
      />
    );
  }
}

export default QueueProcessedTable


