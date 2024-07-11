import express from "express";
import cors from "cors";

import schoolRoutes from "./routes/schoolRoutes";
import kindergartenRoutes from "./routes/kindergartenRoutes";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use(schoolRoutes);
app.use(kindergartenRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
