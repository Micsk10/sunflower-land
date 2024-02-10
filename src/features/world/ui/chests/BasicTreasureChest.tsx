import { useActor } from "@xstate/react";
import { Label } from "components/ui/Label";
import { Panel } from "components/ui/Panel";
import { Context } from "features/game/GameProvider";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { ITEM_DETAILS } from "features/game/types/images";
import React, { useContext } from "react";
import { useAppTranslation } from "lib/i18n/useAppTranslations";

interface Props {
  onClose: () => void;
}

export const BasicTreasureChest: React.FC<Props> = ({ onClose }) => {
  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);
  const { t } = useAppTranslation();

  const hasKey = !!gameState.context.state.inventory["Treasure Key"];
  if (!hasKey) {
    return (
      <CloseButtonPanel onClose={onClose}>
        <div className="p-2">
          <Label
            type="danger"
            className="mb-2"
            icon={ITEM_DETAILS["Treasure Key"].image}
          >
            {t("basic.treasure.missingKey")}
          </Label>
          <p className="text-xs mb-2">{t("basic.treasure.needKey")}.</p>
          <p className="text-xs">{t("basic.treasure.getKey")}.</p>
        </div>
      </CloseButtonPanel>
    );
  }
  return <Panel></Panel>;
};
