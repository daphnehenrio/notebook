// ? Import npm
import { Router } from 'express';

// ? Import local
// | Factorizations Try catch
import { capture } from '../utils';
// | Controllers
import { 
  foldersController,
  documentsController,
  mainController,
} from '../controllers';

// ? Router
const router = Router();

// ? Routes
// | Folders
router.post('/folders', capture(foldersController.createFolder))
      .patch('/folders/:id', capture(foldersController.updateFolder));

// | Documents
router.post('/documents', capture(documentsController.createDocument))
      .patch('/documents/:id', capture(documentsController.updateDocument));

// | Main
router.get('/:class', capture(mainController.getAll) )
      .get('/:class/:id', capture(mainController.getOne) )
      .post('/:class', capture(mainController.createOne))
      .patch('/:class/:id', capture(mainController.updateOne))
      .delete('/:class/:id', capture(mainController.deleteOne))
      .delete('/:class', capture(mainController.deleteAll));


// | 404
router.use((req, res) => {
  console.log(req.originalUrl);
  res.status(404).send('Not Found');
});

// ? Export
export default router;
