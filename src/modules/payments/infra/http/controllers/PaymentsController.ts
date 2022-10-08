import CreatePaymentService from '@modules/payments/services/CreatePaymentService';
import DeletePaymentService from '@modules/payments/services/DeletePaymentService';
import FindPaymentService from '@modules/payments/services/FindPaymentService';
import UpdatePaymentService from '@modules/payments/services/UpdatePaymentService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class PaymentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      value,
      paymentDate,
      referenceDate,
      nextDueDate,
      athlete_id
    } = request.body;

    const createPayment = container.resolve(CreatePaymentService);

    const payment = await createPayment.execute({
      value,
      paymentDate,
      referenceDate,
      nextDueDate,
      athlete_id,
    });

    return response.status(201).json(payment);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findPayment = container.resolve(FindPaymentService);

    const payments = await findPayment.execute({
      id,
    });

    return response.status(200).json(payments);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      value,
      paymentDate,
      referenceDate,
      nextDueDate,
    } = request.body;

    const updatePayment = container.resolve(UpdatePaymentService);

    const updatedPayment = await updatePayment.execute({
      id,
      value,
      paymentDate,
      referenceDate,
      nextDueDate,
    });

    return response.status(200).json(updatedPayment);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePayment = container.resolve(DeletePaymentService);

    await deletePayment.execute({
      id
    });

    return response.status(204).send();
  }
}

export default PaymentsController;
