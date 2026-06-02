import express,{Request,Response,Router} from "express"
import {
    getAllDepartments,
    getOneDepartment,
    insertDepartment,
    updateDepartment,
    deleteDepartment
}
from "../controllers/departmentController";
const router:Router = express.Router();
router.get("/",async (req:Request,res:Response):Promise<void>=> {
    const departments= await getAllDepartments();
    res.status(200).json(departments)
});
router.get("/:id",async (req:Request,res:Response):Promise<void>=>{
    const id :number=Number(req.params.id);
    const department = await getOneDepartment(id);
    res.status(200).json(department);
});
router.post("/",async (req:Request,res:Response):Promise<void>=>{
    const {
        departmentName,
        location
    }: {
        departmentName:string;
        location:string
    } = req.body;
    await insertDepartment({
        departmentName,location
    });
    res.status(201).json({
        message:"Department Created"
    });
}
);
router.put(
    "/:id",async (req:Request,res:Response
    ): Promise<void>=> {
        const id :number=Number(req.params.id);
        const {
            departmentName,location
        }: {
            departmentName:string;
            location:string;
        }=req.body;
        await updateDepartment(
            id,departmentName,location
        );
        res.status(200).json({
            message:"Department Updated"
        });
    }
);
router.delete("/:id",async(req:Request,res:Response):Promise<void>=> {
    const id:number =Number(req.params.id);
    await deleteDepartment(id);
    res.status(200).json({
        message:"Department Deleted"
    });
}
);
export default router;