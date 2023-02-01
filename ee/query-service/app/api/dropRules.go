package api

import (
	"net/http"

	"go.signoz.io/signoz/pkg/query-service/agentConf"
)

func (ah *APIHandler) listDropRules(w http.ResponseWriter, r *http.Request) {
	ah.listIngestionRulesHandler(w, r, agentConf.ElementTypeSamplingRules)
}

func (ah *APIHandler) createDropRule(w http.ResponseWriter, r *http.Request) {
	ah.createIngestionRule(w, r, agentConf.ElementTypeDropRules)
}
