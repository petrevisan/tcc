import { fastify } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifyCors } from "@fastify/cors";
import ScalarApiReference from "@scalar/fastify-api-reference";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: true,
  methods: ["GET", "PATCH", "PUT", "DELETE", "OPTIONS", "POST"],
  credentials: true,
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "TCC",
      description: "tcc",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(ScalarApiReference, {
  routePrefix: "/docs",
});

app.listen({ port: 8000, host: "0.0.0.0" }).then(() => {
  console.log("Server running at 8080");
  console.log("Docs available at http://localhost:8080/docs");
});
