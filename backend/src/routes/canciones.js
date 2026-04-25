const { Router } = require("express")
const controller = require("../controllers/cancionesController")

// Rutas de canciones
const router = Router()

router.get("/", controller.listar)
router.get("/:id", controller.obtener)
router.post("/", controller.crear)
router.put("/:id", controller.actualizar)
router.patch("/:id", controller.actualizarParcial)
router.delete("/:id", controller.eliminar)

module.exports = router
