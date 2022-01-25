// ? Import npm
import { Router } from 'express';

// ? Import local
// Factorizations Try catch
import capture from '../utils/capture';
// Controllers
import { 
  documentsController,
  foldersController,
  labelsController,
  mainController,
} from '../controllers';

// ? Router
const router = Router();

// ? Routes
// | Folders
router.post('/folders', capture(foldersController.createFolder))
      .put('/folders/:id', capture(foldersController.updateFolder));

// | Main
router.get('/:class', capture(mainController.getAll) );
router.get('/:class/:id', capture(mainController.getOne) );
router.post('/:class', capture(mainController.createOne));
router.patch('/:class/:id', capture(mainController.updateOne));
router.delete('/:class/:id', capture(mainController.deleteOne) );

// | Folders
// router.get('/folders', capture(foldersController.getFolders))
//       .get('/folders/:id', capture(foldersController.getFolder))
//       .post('/folders', capture(foldersController.createFolder))
//       .put('/folders/:id', capture(foldersController.updateFolder))
//       .delete('/folders/:id', capture(foldersController.deleteFolder));

// | Documents
// router.get('/documents', capture(documentsController.getDocuments))
//       .get('/documents/:id', capture(documentsController.getDocument))
//       .post('/documents', capture(documentsController.createDocument))
//       .put('/documents/:id', capture(documentsController.updateDocument))
//       .delete('/documents/:id', capture(documentsController.deleteDocument));

// | Labels
// router.get('/labels', capture(labelsController.getLabels))
//       .get('/labels/:id', capture(labelsController.getLabel))
//       .post('/labels', capture(labelsController.createLabel))
//       .put('/labels/:id', capture(labelsController.updateLabel))
//       .delete('/labels/:id', capture(labelsController.deleteLabel));

// 404
router.use((req, res) => {
  console.log(req.originalUrl);
  res.status(404).send('Not Found');
});

// ? Export
export default router;
