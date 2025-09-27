# ===============================
# AWS Management
# ===============================

# --- Variables ---
STACK ?= --all
FULL_STACK_NAME = $(if $(filter --all,$(STACK)),$(STACK),Kaleening-$(STACK)Stack)

# ===============================
# CDK AWS TARGETS
# ===============================

.PHONY: deploy hotswap destroy watch diff bootstrap

deploy:
	@echo "🚀 Deploying stack(s): [$(FULL_STACK_NAME)]"
	cd $(BACKEND_DIR) && cdk deploy $(FULL_STACK_NAME) --require-approval never

hotswap:
	@echo "⚡ Hotswapping stack(s): [$(FULL_STACK_NAME)]"
	cd $(BACKEND_DIR) && cdk deploy $(FULL_STACK_NAME) --hotswap

destroy:
	@echo "💥 Destroying stack(s): [$(FULL_STACK_NAME)]"
	@echo "⚠️  This will permanently delete resources!"
	@read -p "Are you sure? (y/N): " confirm && [ "$$confirm" = "y" ] || exit 1
	cd $(BACKEND_DIR) && cdk destroy $(FULL_STACK_NAME)

watch:
	@echo "👀 Watching stack(s): [$(FULL_STACK_NAME)]"
	cd $(BACKEND_DIR) && cdk watch $(FULL_STACK_NAME)

diff:
	@echo "📋 Showing diff for stack(s): [$(FULL_STACK_NAME)]"
	cd $(BACKEND_DIR) && cdk diff $(FULL_STACK_NAME)

bootstrap:
	@echo "🏗️  Bootstrapping CDK environment..."
	cd $(BACKEND_DIR) && cdk bootstrap



# --- Utility targets ---
list-stacks:
	@echo "📋 Available stacks:"
	cd $(BACKEND_DIR) && cdk list

synth:
	@echo "🔨 Synthesizing CloudFormation templates..."
	cd $(BACKEND_DIR) && cdk synth $(FULL_STACK_NAME)

validate:
	@echo "✅ Validating CDK app..."
	cd $(BACKEND_DIR) && cdk doctor



# ===============================
# Development targets
# ===============================
# --- Error Monitoring ---


check-errors:
	@echo "🔍 Checking Lambda errors..."
	python3 $(AWS_SCRIPTS_DIR)/check_lambda_errors.py


delete-logs:
	@echo "🗑️  Deleting CloudWatch logs..."
	$(AWS_SCRIPTS_DIR)/delete-logs.sh


# ===============================
# aws help
# ===============================


aws-help:
	@echo "🏗️  AWS Commands:"
	@echo "  deploy         Deploy stack(s) [STACK=name]"
	@echo "  hotswap        Hotswap stack(s) for faster development"
	@echo "  destroy        Destroy stack(s) (with confirmation)"
	@echo "  watch          Watch stack(s) for changes"
	@echo "  diff           Show differences before deployment"
	@echo "  bootstrap      Bootstrap CDK environment"
	@echo ""
	@echo "  Utility targets for AWS:"
	@echo ""
	@echo "  list-stacks    List all available stacks"
	@echo "  synth          Generate CloudFormation templates"
	@echo "  validate       Validate CDK application" 
	@echo ""
	@echo "  Error Monitoring targets:"
	@echo ""
	@echo "  check-errors   Check Lambda errors"
	@echo "  delete-logs    Delete CloudWatch logs"
	@echo ""