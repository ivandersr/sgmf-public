import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateSubscriptionService from '@modules/subscriptions/services/CreateSubscriptionService';
import ListSubscriptionsService from '@modules/subscriptions/services/ListSubscriptionsService';
import UpdateSubscriptionService from '@modules/subscriptions/services/UpdateSubscriptionService';
import FindSubscriptionService from '@modules/subscriptions/services/FindSubscriptionService';

class SubscriptionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page, pageSize } = request.query;

    const listSubscriptions = container.resolve(ListSubscriptionsService);

    const subscriptions = await listSubscriptions.execute({
      page: String(page),
      pageSize: String(pageSize),
    });

    return response.status(200).json(subscriptions);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findSubscription = container.resolve(FindSubscriptionService);

    const subscription = await findSubscription.execute({ id });

    return response.status(200).json(subscription);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, value } = request.body;

    const createSubscription = container.resolve(CreateSubscriptionService);

    const subscription = await createSubscription.execute({ title, value });

    return response.status(201).json(subscription);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, value } = request.body;

    const updateSubscription = container.resolve(UpdateSubscriptionService);

    const subscription = await updateSubscription.execute({ id, title, value });

    return response.status(200).json(subscription);
  }
}

export default SubscriptionsController;
