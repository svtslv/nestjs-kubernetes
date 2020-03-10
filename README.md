# NestJS Kubernetes

NestJS Kubernetes example

## Features
- nestjs
- kubernetes
- skaffold
- postgres
- redis
- minio
- data
- secrets
- volumes

## How to use

```sh
git clone https://github.com/svtslv/nestjs-kubernetes
```

```sh
cd nestjs-kubernetes
```

### Create namespace and volume

- Add local-path-provisioner

```sh
kubectl apply -f kubernetes/_local-path-provisioner.yaml
```

- Create nestjs-kubernetes-namespace

```sh
kubectl apply -f kubernetes/01-namespaces.yaml
```

- Create nestjs-kubernetes-volume

```sh
kubectl apply -f kubernetes/02-volumes.yaml
```

### Run on local kubernetes

```sh
skaffold dev --port-forward
```

### Run on remote kubernetes

- Update `stringData..dockerconfigjson` -> `kubernetes/03-secrets.yaml`
- Update `...template.containers.image` -> `kubernetes/08-nestjs.yaml`
- Update `build.artifacts.-image` -> `skaffold.yaml`

```sh
skaffold dev --port-forward
```

### Port Forward

- 3000 - nestjs
- 3001 - data
- 9000 - minio
- 5432 - postgres
- 6379 - redis

Star it, open `http://localhost:3000` change the code and enjoy!

## License

MIT