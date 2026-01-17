from __future__ import annotations

from typing import TYPE_CHECKING, Any

from lfx.components._importing import import_mod

if TYPE_CHECKING:
    from lfx.components.n1n.n1n_chat_model import N1NModelComponent

_dynamic_imports = {
    "N1NModelComponent": "n1n_chat_model",
}

__all__ = ["N1NModelComponent"]


def __getattr__(attr_name: str) -> Any:
    """Lazily import n1n components on attribute access."""
    if attr_name not in _dynamic_imports:
        msg = f"module '{__name__}' has no attribute '{attr_name}'"
        raise AttributeError(msg)

    try:
        result = import_mod(attr_name, _dynamic_imports[attr_name], __spec__.parent)
    except (ModuleNotFoundError, ImportError, AttributeError) as e:
        msg = f"Could not import '{attr_name}' from '{__name__}': {e}"
        raise AttributeError(msg) from e

    globals()[attr_name] = result
    return result


def __dir__() -> list[str]:
    return list(__all__)
