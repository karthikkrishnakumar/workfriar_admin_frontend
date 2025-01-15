/**
 * Interface representing the client data structure.
 * @interface ClientData
 */

export interface ClientData {
    _id: string;
    client_name: string;
    location_id: string;
    location: string;
    client_manager_id: string;
    client_manager: string;
    billing_currency_id: string;
    billing_currency: string;
    status: string;
  }