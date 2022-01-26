// ? Import npm
import { Router } from 'express';

// ? Import local
// | Factorizations Try catch
import capture from '../utils/capture';
// | Controllers
import { 
  foldersController,
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

// | 404
router.use((req, res) => {
  console.log(req.originalUrl);
  res.status(404).send('Not Found');
});

// ? Export
export default router;
