#/bin/sh
protoc --plugin=$(pnpm root)/.bin/protoc-gen-ts_proto \
    --ts_proto_opt=forceLong=string \
    --ts_proto_opt=outputServices=grpc-js \
    --ts_proto_opt=esModuleInterop=true \
    --ts_proto_out=. ./src/lib/api/grpc/proto/category.proto
