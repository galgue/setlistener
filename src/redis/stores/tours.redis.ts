import { z } from "zod";
import { createStore } from "./createStore";

const ToursSchema = z.array(z.string());

export const toursStore = createStore("tours", ToursSchema);
