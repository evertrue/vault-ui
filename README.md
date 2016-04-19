# vault-ui

A simple UI for listing & displaying all of the secrets in an instance of [Haschicorp’s Vault](https://www.vaultproject.io).

## Requirements

* Node.js v5.x
* Docker
* A running & unsealed Vault instance

## Usage

1. Clone this repo
2. Set `VAULT_ADDR` and `VAULT_TOKEN` in your env to valid values
    * You must generate a token that can list & read secrets in the `secret/default` namespace
3. Build & run the Docker container:

    ```bash
    docker build -t evertrue/vault-ui . && \
    docker run -rm \
        -e VAULT_TOKEN=$VAULT_TOKEN \
        -e VAULT_ADDR=$VAULT_ADDR \
        -p 80:3000 \
        evertrue/vault-ui
    ```
4. View the running app in a browser: `open http://$(docker-machine ip default)`

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Credits

Author:: Jeff Byrnes (@jeffbyrnes)

## License

Copyright (C) 2016 EverTrue, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
