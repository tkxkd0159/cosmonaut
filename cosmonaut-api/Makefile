.PHONY: rust-build clippy clean rust-init cargofmt rustfmt

USER_ID =
LESSON =
CHAPTER =
COSM_ROOT = "/workspace/cargo-projects"
COSM_LIB = "cosm-base"
SKELETON_PATH = "skeleton/lesson${LESSON}/chapter${CHAPTER}/contracts"
RUNNER_PATH = "lessons/lesson$(LESSON)/chapter$(CHAPTER)"
USER_PATH_PREFIX = "cosm"
USER_CONTRACT_PATH = "$(USER_PATH_PREFIX)/${USER_ID}/lesson${LESSON}/chapter${CHAPTER}"
TARGET_PATH = "$(COSM_ROOT)/$(USER_CONTRACT_PATH)"

# Set for local environment if you need. Mostly only use when test
DOCKER_IMG ?="cosmo-rust:1.0"
SAVE_ROOT ?="$(CURDIR)/cargo-projects"

# Set docker volumes for container deployment. Default setting is Docker Compose
COMPOSE_COSM_BASE ?= cosmonaut_cosmbase         # Where to store CosmWasm training sources
COMPOSE_COSM_USER ?= cosmonaut_cosmproj         # Where to save user's project files
COMPOSE_CARGO_REG ?= cosmonaut_cargo            # Where to save Rust packacge registry for caching
COMPOSE_COSM_IMG ?= "tkxkd0159/cosmo-rust:dind" # For internal rust build

.PHONY: test

rustfmt:
ifeq (${COMPOSE},true)
	@docker run --rm -i -a stdout $(COMPOSE_COSM_IMG) rustfmt
else
	@docker run --rm -i -a stdout $(DOCKER_IMG) rustfmt
endif

cosm-init:
ifeq (${COMPOSE},true)
	@mkdir -p $(COSM_ROOT)/$(USER_CONTRACT_PATH)
	@cp -r $(COSM_ROOT)/$(COSM_LIB)/$(SKELETON_PATH) $(COSM_ROOT)/$(USER_CONTRACT_PATH)
	@cp -r $(COSM_ROOT)/$(COSM_LIB)/$(RUNNER_PATH)/* $(COSM_ROOT)/$(USER_CONTRACT_PATH)/
else
	@mkdir -p $(SAVE_ROOT)/$(USER_CONTRACT_PATH)
	@cp -r $(SAVE_ROOT)/$(COSM_LIB)/$(SKELETON_PATH) $(SAVE_ROOT)/$(USER_CONTRACT_PATH)
	@cp -r $(SAVE_ROOT)/$(COSM_LIB)/$(RUNNER_PATH)/* $(SAVE_ROOT)/$(USER_CONTRACT_PATH)/
endif

cargofmt:
ifeq (${COMPOSE},true)
	@docker run --rm -a stderr \
	-v $(COMPOSE_COSM_BASE):$(COSM_ROOT)/$(COSM_LIB) -v $(COMPOSE_COSM_USER):$(COSM_ROOT)/$(USER_PATH_PREFIX) -v $(COMPOSE_CARGO_REG):/usr/local/cargo/registry \
	-w $(TARGET_PATH) $(COMPOSE_COSM_IMG) \
	bash -c "cargo fmt"
else
	@docker run -d --rm -v $(SAVE_ROOT):$(COSM_ROOT) -w $(TARGET_PATH) $(DOCKER_IMG) \
	bash -c "cargo fmt"
endif

cosm-build:
ifeq (${COMPOSE},true)
	@docker run --rm -a stderr -a stdout \
	-v $(COMPOSE_COSM_BASE):$(COSM_ROOT)/$(COSM_LIB) -v $(COMPOSE_COSM_USER):$(COSM_ROOT)/$(USER_PATH_PREFIX) -v $(COMPOSE_CARGO_REG):/usr/local/cargo/registry \
	-w $(TARGET_PATH) $(COMPOSE_COSM_IMG) \
	bash -c "cargo run"
else
	@docker run --rm -a stderr -a stdout -v $(SAVE_ROOT):$(COSM_ROOT) -w $(TARGET_PATH) $(DOCKER_IMG) \
	bash -c "cargo run"
endif

cosm-clean:
ifeq (${COMPOSE},true)
	@docker run --rm \
	-v $(COMPOSE_COSM_BASE):$(COSM_ROOT)/$(COSM_LIB) -v $(COMPOSE_COSM_USER):$(COSM_ROOT)/$(USER_PATH_PREFIX) -v $(COMPOSE_CARGO_REG):/usr/local/cargo/registry \
	-w $(TARGET_PATH) $(COMPOSE_COSM_IMG) \
	bash -c "cargo clean"
else
	@docker run -d --rm -v $(SAVE_ROOT):$(COSM_ROOT) -w $(TARGET_PATH) $(DOCKER_IMG) \
	bash -c "cargo clean"
endif

clippy:
ifeq (${COMPOSE},true)
	@docker run --rm -a stderr -a stdout \
	-v $(COMPOSE_COSM_BASE):$(COSM_ROOT)/$(COSM_LIB) -v $(COMPOSE_COSM_USER):$(COSM_ROOT)/$(USER_PATH_PREFIX) -v $(COMPOSE_CARGO_REG):/usr/local/cargo/registry \
	-w $(TARGET_PATH) $(COMPOSE_COSM_IMG) \
	bash -c "cargo clippy 2>&1"
else
	@docker run --rm -a stderr -a stdout -v $(SAVE_ROOT):$(COSM_ROOT) -w $(TARGET_PATH) $(DOCKER_IMG) \
	bash -c "cargo clippy 2>&1"
endif
