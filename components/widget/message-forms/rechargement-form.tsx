import SimpleInput, {SimpleInputDisable, TextAreaInput} from "@/components/widget/input/text-input";
import * as React from "react";

export function SendRechargementMessage() {
    return(
        <>
            <SimpleInputDisable
                label={"Thème"}
                value={"RECHARGEMENT"}
            />

            <SimpleInput
                label={"Objet"}
                value={""}
                placeholder={"(Optionnel)"}
            />

            <TextAreaInput
                value={""}
                placeholder={"Tapez votre message"}
            />
        </>
    )
}
