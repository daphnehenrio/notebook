// ? Import NPM
import { Request, Response } from 'express';

// ? Import local
// | schema
import { Labels } from '../../schema';
// | utils
import { generateUUID } from '../../utils/uuid';

// ? Controllers
const labelsControllers = {
  /**
   * @description Get all labels
   * @param req Request
   * @param res Response
   * @returns Returns a list of labels
   */
  getLabels: async (req: Request, res: Response) => {
    await Labels
      .find({}).sort({ createdAt: -1 })
      .then((response) => {
        res.status(200).json(response);
      });
  },
  /**
   * @description Get a label
   * @param req Request
   * @param res Response
   * @returns Returns a label
   */
  getLabel: async (req: Request, res: Response) => {
    await Labels
      .findOne({ _id: req.params.id })
      .then((response) => {
        if (!response) throw new Error('Label not found');
        res.status(200).json(response);
      });
  },
  /**
   * @description Create a label
   * @param req Request
   * @param res Response
   * @returns Returns a label
   */
  createLabel: async (req: Request, res: Response) => {
    const { name, color, cratedBy } = req.body;

    const newLabel = new Labels({
      _id: `lab_${generateUUID()}`,
      name,
      color,
      cratedBy,
      createdAt: new Date(),
    });

    await newLabel
      .save()
      .then((response: Response) => {
        res.status(200).json(response);
      });
  },
  /**
   * @description Update a label
   * @param req Request
   * @param res Response
   * @returns Returns a label
   */
  updateLabel: async (req: Request, res: Response) => {
    const { name, color } = req.body;

    const label = await Labels
      .findOneAndUpdate({ _id: req.params.id }, {
        name,
        color,
        updatedAt: new Date(),
      })
      .then((response: Response) => {
        if (!response) throw new Error('Label not found');
        return response;
      });

      await Labels
        .findOne({ _id: req.params.id })
        .then((response) => {
          if (!response) throw new Error('Label not found');
          res.status(200).json({
            old: label,
            updated: response
          });
        });
  },
  /**
   * @description Delete a label
   * @param req Request
   * @param res Response
   * @returns Returns a label
   */
  deleteLabel: async (req: Request, res: Response) => {
    await Labels
      .findOneAndDelete({ _id: req.params.id })
      .then((response: Response) => {
        if (!response) throw new Error('Label not found');
        res.status(200).json(response);
      });
  },
};

// ? Export
export default labelsControllers;