# Chat

This folder contains tools for preparing the pinecone vector database for use with the chat bot. You can re/create embeddings, as well as test contextual responses.

First ensure your python environment has the dependecies listed in `requirements.txt`. Then create the env file with `cp .env.dist .env`, and populate it with the OpenAI api key and Pinecone api key. The script then has the following options:

```
-h, --help           show this help message and exit
--create_embeddings  Recreated embeddings
--example EXAMPLE    Run with a sample prompt. Usage: --example "What is mindfuture?"
```
